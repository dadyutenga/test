import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, language, setLanguage, languageNames, languages } = useLanguage();

  const navItems = [
    { label: t("home"), href: "#home" },
    { label: t("about"), href: "#about" },
    { label: t("services"), href: "#services" },
    { label: t("projects"), href: "#projects" },
    { label: t("contact"), href: "#contact" },
    { label: "Admin", href: "/admin/login", isRoute: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#home" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src={logo} alt="GreenScape Consults Tz Ltd" className="h-full w-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold text-primary leading-tight block">GreenScape Consults</span>
            <span className="text-xs text-muted-foreground">Building Landscapes, Shaping Futures</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-border"
            >
              <Globe size={16} />
              <span>{languageNames[language]}</span>
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                        lang === language ? "text-primary font-semibold bg-muted" : "text-foreground"
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              {/* Mobile language selector */}
              <li className="pt-2 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        lang === language ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
