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
                        className="w-full relative overflow-hidden group border-b-2 md:border-b-4 border-black"
                        style={{ backgroundColor: banner.bg_color, color: banner.text_color }}
                    >
                        <div className="flex items-center py-2 px-4 min-h-[40px] relative overflow-hidden">
                            {/* Marquee Wrapper */}
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                                className="flex whitespace-nowrap items-center pr-12"
                            >
                                {[...Array(10)].map((_, i) => (
                                    <span key={i} className="text-lg md:text-2xl uppercase font-black tracking-tighter italic mr-8">
                                        {banner.text} •
                                    </span>
                                ))}
                            </motion.div>

                            {/* Close button - Fixed on top of marquee */}
                            <div className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center bg-gradient-to-l from-inherit via-inherit to-transparent z-20">
                                <button
                                    onClick={() => setBanners(prev => prev.filter(b => b.id !== banner.id))}
                                    className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center hover:bg-black hover:text-[#d9ff36] transition-all group-hover:rotate-90"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
