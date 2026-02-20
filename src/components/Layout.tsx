import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Trophy, Users, MapPin, LayoutDashboard, Settings, Bell, Calendar, ChevronRight, Sun, Moon, Languages, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "@/src/context/AppContext";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const { theme, setTheme, language, setLanguage, t } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: t("dashboard"), path: "/" },
    { icon: Trophy, label: t("tournaments"), path: "/tournaments" },
    { icon: Calendar, label: t("schedule"), path: "/schedule" },
    { icon: Users, label: t("players"), path: "/players" },
    { icon: MapPin, label: t("clubs"), path: "/clubs" },
    { icon: Settings, label: t("settings"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen w-full bg-bg-main text-text-body font-sans transition-colors duration-300 flex flex-col">
      {/* Top Header - Level 1 */}
      <header className="h-20 border-b border-white/5 bg-bg-card/80 backdrop-blur-xl sticky top-0 z-50 px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Trophy size={22} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-lg text-text-main tracking-tight leading-none">Billiards Pro</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mt-1">Management</span>
            </div>
          </div>

          {/* Desktop Nav - Level 1 */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-text-muted hover:text-text-main hover:bg-white/5"
                  )
                }
              >
                <item.icon size={16} strokeWidth={2.5} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 mr-4">
            <button 
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-text-main hover:bg-white/10 transition-all"
            >
              <Languages size={16} />
              <span className="uppercase">{language}</span>
            </button>

            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-white/10 transition-all"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="h-8 w-px bg-white/10 mx-2 hidden md:block" />

          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-white/10 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-bg-main"></span>
          </button>

          <div className="flex items-center gap-3 ml-2 p-1.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-bg-input flex items-center justify-center text-xs font-bold text-text-main border border-white/10">
              AD
            </div>
            <div className="hidden sm:flex flex-col min-w-0 pr-2">
              <span className="text-xs font-bold text-text-main truncate">Admin</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-bg-card border-b border-white/5 overflow-hidden"
          >
            <nav className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                      isActive ? "bg-primary/10 text-primary" : "text-text-muted"
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => setLanguage(language === "en" ? "vi" : "en")}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 text-xs font-bold"
                >
                  <Languages size={16} /> {language.toUpperCase()}
                </button>
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 text-xs font-bold"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />} Theme
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-10 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-bg-card/30">
        <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-50">
            <Trophy size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Billiards Pro Management © 2026</span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
