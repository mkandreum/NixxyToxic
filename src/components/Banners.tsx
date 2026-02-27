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
                        className="w-full relative overflow-hidden group border-b-2 md:border-b-4 border-black bg-black text-[#d9ff36]"
                    >
                        <div className="flex items-center py-1 md:py-2 px-4 min-h-[32px] md:min-h-[40px] relative overflow-hidden">
                            {/* Marquee Wrapper */}
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                                className="flex whitespace-nowrap items-center pr-12"
                            >
                                {[...Array(12)].map((_, i) => (
                                    <span key={i} className="text-base md:text-xl uppercase font-black tracking-widest italic mr-6 glitch-text">
                                        {banner.text} •
                                    </span>
                                ))}
                            </motion.div>

                            {/* Close button - Styled to fit the black/yellow aesthetic */}
                            <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-gradient-to-l from-black via-black/80 to-transparent z-20">
                                <button
                                    onClick={() => setBanners(prev => prev.filter(b => b.id !== banner.id))}
                                    className="w-6 h-6 border-2 border-[#d9ff36] rounded-full flex items-center justify-center hover:bg-[#d9ff36] hover:text-black transition-all group-hover:rotate-90"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
