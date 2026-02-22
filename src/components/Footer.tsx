import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactInfo, useSubmitMessage } from "@/hooks/use-contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t } = useLanguage();
  const { data: contact } = useContactInfo();
  const submitMutation = useSubmitMessage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const phone = contact?.phone || "";
  const contactEmail = contact?.email || "";
  const whatsapp = contact?.whatsapp || "";
  const address = contact?.address || "";
  const phoneLink = phone.replace(/\s/g, "");
  const whatsappNum = whatsapp.replace(/[\s+]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMutation.mutateAsync(formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer id="contact">
      {/* Get In Touch Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t("getInTouch")}</h2>
              <p className="text-primary-foreground/70 font-body text-base leading-relaxed mb-8">
                {t("getInTouchDesc")}
              </p>
              <div className="space-y-4">
                {phone && (
                  <a href={`tel:${phoneLink}`} className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body">
                    <Phone size={18} className="text-accent" />
                    {phone}
                  </a>
                )}
                {contactEmail && (
                  <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body">
                    <Mail size={18} className="text-accent" />
                    {contactEmail}
                  </a>
                )}
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsappNum}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body"
                  >
                    <MessageCircle size={18} className="text-accent" />
                    WhatsApp: {whatsapp}
                  </a>
                )}
                {address && (
                  <div className="flex items-start gap-3 text-primary-foreground/80 font-body">
                    <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                    {address}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Send us a Message</h3>
              {submitted ? (
                <p className="text-accent font-body text-sm py-8">Thank you! Your message has been sent.</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                  <Input
                    placeholder="Subject (optional)"
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                  <Textarea
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    required
                    rows={3}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  />
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  >
                    <Send size={16} />
                    {submitMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
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
                {contactEmail && (
                  <li>
                    <a href={`mailto:${contactEmail}`} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {contactEmail}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phoneLink}`} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {phone}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li>
                    <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      WhatsApp: {whatsapp}
                    </a>
                  </li>
                )}
                {address && <li className="text-primary-foreground/60">{address}</li>}
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
