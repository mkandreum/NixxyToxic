import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Image as ImageIcon, Calendar, ShoppingCart } from "lucide-react";

// Components
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Store from "./components/Store";
import Marquee from "./components/Marquee";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Banners from "./components/Banners";
import { ToastProvider } from "./components/Toast";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuClicks, setMenuClicks] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'admin'>('home');
  const [siteSettings, setSiteSettings] = useState<any>({ site_logo_text: 'Nixxy Toxic', site_logo_url: '' });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSiteSettings(data);
        }
      })
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  const handleMenuClick = () => {
    const newClicks = menuClicks + 1;
    setMenuClicks(newClicks);
    if (newClicks >= 5) {
      setCurrentView('login');
      setMenuClicks(0);
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#dfff00] text-black font-mono font-bold selection:bg-black selection:text-[#dfff00]">
        <Banners />

        {/* Navigation - Floating Pill */}
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-fit max-w-[95vw] z-50 border-4 md:border-6 border-black rounded-full bg-[#dfff00] flex justify-between items-center px-4 py-2 md:px-16 md:py-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] gap-2 sm:gap-10 md:gap-20 whitespace-nowrap overflow-hidden">
          <a href="#gallery" className="text-sm sm:text-2xl md:text-5xl uppercase hover:glitch-text transition-all font-mono font-black shrink hover:text-[#ff00ff]">Gallery</a>
          <a href="#events" className="text-sm sm:text-2xl md:text-5xl uppercase hover:glitch-text transition-all font-mono font-black shrink hover:text-[#00ff00]">Shows</a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mx-2 md:mx-8 select-none flex items-center justify-center flex-shrink-0 min-w-fit hover:scale-110 active:scale-95 transition-transform"
          >
            {siteSettings.site_logo_url ? (
              <img src={siteSettings.site_logo_url} alt="Logo" className="h-14 sm:h-24 md:h-36 w-auto object-contain drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] flex-shrink-0" />
            ) : (
              <span className="text-2xl sm:text-5xl md:text-7xl font-logo leading-none text-center flex flex-col uppercase flex-shrink-0">
                {siteSettings.site_logo_text.split(' ').map((word: string, i: number) => (
                  <span key={i} className={i % 2 === 0 ? "text-black" : "text-[#ff00ff]"}>{word}</span>
                ))}
              </span>
            )}
          </a>

          <a href="#store" className="text-sm sm:text-2xl md:text-5xl uppercase hover:glitch-text transition-all font-mono font-black shrink hover:text-[#00ffff]">Store</a>

          <button
            onClick={handleMenuClick}
            className="relative w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 z-50 flex-shrink-0 cursor-pointer group"
            aria-label="Menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, top: "50%", y: "-50%", backgroundColor: "#ff00ff" } : { rotate: 0, top: "0%", y: "0%", backgroundColor: "#000000" }}
              className="absolute left-0 w-full h-[5px] md:h-[8px] block origin-center transition-all group-hover:bg-[#bc13fe]"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, top: "50%", y: "-50%", backgroundColor: "#ff00ff" } : { rotate: 0, top: "100%", y: "-100%", backgroundColor: "#000000" }}
              className="absolute left-0 w-full h-[5px] md:h-[8px] block origin-center transition-all group-hover:bg-[#bc13fe]"
            />
          </button>
        </nav>

        {/* Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="fixed inset-0 z-40 bg-black text-[#dfff00] pt-32 px-8 flex flex-col gap-8 text-5xl md:text-8xl uppercase tracking-tighter font-black overflow-y-auto pb-12"
            >
              <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-[#ff00ff] transition-colors flex items-center gap-6 py-4 border-b-4 border-[#dfff00]/20 hover:border-[#ff00ff] hover:pl-8">
                <ImageIcon size={64} className="hidden md:block" /> Gallery
              </a>
              <a href="#events" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ff00] transition-colors flex items-center gap-6 py-4 border-b-4 border-[#dfff00]/20 hover:border-[#00ff00] hover:pl-8">
                <Calendar size={64} className="hidden md:block" /> Shows
              </a>
              <a href="#store" onClick={() => setIsMenuOpen(false)} className="hover:text-[#00ffff] transition-colors flex items-center gap-6 py-4 border-b-4 border-[#dfff00]/20 hover:border-[#00ffff] hover:pl-8">
                <ShoppingCart size={64} className="hidden md:block" /> Store
              </a>

              <div className="mt-auto pt-12 text-2xl md:text-4xl text-white opacity-50">
                Follow the toxicity
                <div className="flex gap-6 mt-4">
                  <a href="#" className="hover:text-[#ff00ff]">IG</a>
                  <a href="#" className="hover:text-[#00ff00]">TT</a>
                  <a href="#" className="hover:text-[#00ffff]">X</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-20 md:pt-32">
          {currentView === 'home' && (
            <>
              <Hero />
              <Marquee text="NIXXY TOXIC BITCH! • " />
              <Gallery />
              <Marquee text="UPCOMING EVENTS • " reverse bg="bg-[#dfff00]" textCol="text-black" />
              <Events />
              <Marquee text="MERCHANDISE • " />
              <Store />
            </>
          )}

          {currentView === 'login' && (
            <Login onLogin={() => setCurrentView('admin')} onBack={() => setCurrentView('home')} />
          )}

          {currentView === 'admin' && (
            <AdminDashboard onLogout={() => setCurrentView('home')} />
          )}
        </main>

        <footer className="border-t-4 border-black bg-black text-[#dfff00] p-12 md:p-24 text-center flex flex-col items-center gap-8">
          <h2 className="text-6xl md:text-9xl font-logo text-[#dfff00]">Nixxy Toxic</h2>
          <p className="text-2xl md:text-4xl uppercase">© {new Date().getFullYear()} All rights reserved, Bitch!</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
