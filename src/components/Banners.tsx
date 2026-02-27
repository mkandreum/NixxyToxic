import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface Banner {
    id: number;
    text: string;
    bg_color: string;
    text_color: string;
    active: number;
}

export default function Banners() {
    const [banners, setBanners] = useState<Banner[]>([]);

    useEffect(() => {
        fetch('/api/banners')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBanners(data.filter(b => b.active === 1));
                }
            })
            .catch(err => console.error("Error fetching banners:", err));
    }, []);

    if (banners.length === 0) return null;

    return (
        <div className="relative w-full z-[100] flex flex-col">
            <AnimatePresence>
                {banners.map((banner, i) => (
                    <motion.div
                        key={banner.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full relative overflow-hidden group border-b-4 border-black"
                        style={{ backgroundColor: banner.bg_color, color: banner.text_color }}
                    >
                        <div className="flex items-center justify-center py-4 px-12 min-h-[64px] relative">
                            {/* Animated Background Element */}
                            <motion.div
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-10 bg-white skew-x-[30deg]"
                            />

                            <p className="text-xl md:text-3xl uppercase font-black text-center tracking-tighter italic leading-none relative z-10 px-10">
                                {banner.text}
                            </p>

                            <button
                                onClick={() => setBanners(prev => prev.filter(b => b.id !== banner.id))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-current rounded-full flex items-center justify-center hover:bg-black hover:text-[#d9ff36] transition-all z-20 group-hover:rotate-90"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
