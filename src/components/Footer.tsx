import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact">
      {/* Get In Touch Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t("getInTouch")}</h2>
              <p className="text-primary-foreground/70 font-body text-base leading-relaxed mb-8">
                {t("getInTouchDesc")}
              </p>
              <div className="space-y-4">
                <a href="tel:+255620569000" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body">
                  <Phone size={18} className="text-accent" />
                  +255 620 569 000
                </a>
                <a href="mailto:priscaezekiel7@gmail.com" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body">
                  <Mail size={18} className="text-accent" />
                  priscaezekiel7@gmail.com
                </a>
                <a
                  href="https://wa.me/255620569000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body"
                >
                  <MessageCircle size={18} className="text-accent" />
                  WhatsApp: +255 620 569 000
                </a>
                <div className="flex items-start gap-3 text-primary-foreground/80 font-body">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  Dar es Salaam, Tanzania
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <a
                href="https://wa.me/255620569000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground font-body font-semibold px-10 py-4 text-sm tracking-wide rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-foreground text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 overflow-hidden flex items-center justify-center">
                  <img src={logo} alt="GreenScape" className="h-full w-full object-cover" />
                </div>
                <span className="font-display text-lg font-bold">GreenScape Consults</span>
              </div>
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                Building Landscapes, Shaping Futures. Transforming Tanzania's outdoor spaces with innovative and sustainable design.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6">{t("quickLinks")}</h4>
              <ul className="space-y-3 font-body text-sm">
                {[
                  { label: t("home"), href: "#home" },
                  { label: t("about"), href: "#about" },
                  { label: t("services"), href: "#services" },
                  { label: t("projects"), href: "#projects" },
                  { label: t("contact"), href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6">{t("contactUs")}</h4>
              <ul className="space-y-3 font-body text-sm">
                <li>
                  <a href="mailto:priscaezekiel7@gmail.com" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    priscaezekiel7@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+255620569000" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    +255 620 569 000
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/255620569000" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    WhatsApp: +255 620 569 000
                  </a>
                </li>
                <li className="text-primary-foreground/60">Dar es Salaam, Tanzania</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-10 pt-8 text-center">
            <p className="text-primary-foreground/40 font-body text-xs">
              © {new Date().getFullYear()} GreenScape Consults Tz Ltd. {t("allRightsReserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
