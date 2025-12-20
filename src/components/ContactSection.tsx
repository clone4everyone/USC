import { Button } from "@/components/ui/button";
import { Calendar, Instagram, Mail, MapPin, MessageCircle, Phone, Sparkles, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-primary/10">
        {/* Multiple floating orbs with different speeds */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s", animationDuration: "6s" }} />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s", animationDuration: "8s" }} />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s", animationDuration: "7s" }} />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
          }} />
        </div>

        {/* Decorative sparkles */}
        <div className="absolute top-32 left-1/4 opacity-30">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <div className="absolute bottom-40 right-1/3 opacity-30" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>
      </div>

      <div className="container px-6 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Mail className="text-primary" size={20} />
            <span className="text-sm font-semibold text-primary">Connect With Us</span>
            <Sparkles className="text-primary" size={16} />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Ready to Begin Your <span className="text-primary">Adventure</span>?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Have questions about our experiences? Ready to book your wilderness adventure? 
            <br className="hidden md:block" />
            Our team is here to guide you every step of the way.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-0">
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Info Card */}
            <div className={`lg:col-span-2 backdrop-blur-xl bg-card/80 rounded-3xl p-6 md:p-8 border border-border/50 shadow-2xl transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}>
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2">
                <MessageCircle className="text-primary" size={20} />
                Get In Touch
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                {/* Location */}
                <a 
                  href="https://maps.app.goo.gl/UmV5CyjBTqd7bCcKA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 md:gap-4 group p-3 md:p-4 rounded-2xl hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-1 text-card-foreground text-sm md:text-base">Location</p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed break-words">R7QR+R62, Unnamed Road, Bahni, Jajwar, Himachal Pradesh 176031</p>
                  </div>
                </a>

                {/* Phone/WhatsApp */}
                <a 
                  href="tel:+918265892437"
                  className="flex items-start gap-3 md:gap-4 group p-3 md:p-4 rounded-2xl hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-1 text-card-foreground text-sm md:text-base">Phone / WhatsApp</p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">+91 82658 92437</p>
                </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:ultimatesurvivalcampsite.info@gmail.com"
                  className="flex items-start gap-3 md:gap-4 group p-3 md:p-4 rounded-2xl hover:bg-primary/5 transition-all"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-1 text-card-foreground text-sm md:text-base">Email</p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed break-all">ultimatesurvivalcampsite.info@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column - Quick Actions & Social Media */}
            <div className="lg:col-span-1 flex flex-col space-y-6">
              {/* Quick Action Buttons */}
              <div className={`backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border/50 shadow-xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}>
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Quick Actions</h4>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start group hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open("tel:+918265892437")}
                  >
                    <Phone className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start group hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open("mailto:ultimatesurvivalcampsite.info@gmail.com")}
                  >
                    <Mail className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                    Send Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start group hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open("#", "_blank")}
                  >
                    <Calendar className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                    Book Session
                  </Button>
            </div>
          </div>

              {/* Social Media */}
              <div className={`backdrop-blur-xl bg-card/80 rounded-3xl p-6 border border-border/50 shadow-xl transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}>
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/usc.dailylife"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all group"
                    aria-label="Instagram"
                  >
                    <Instagram className="group-hover:scale-110 transition-transform" size={20} />
                  </a>
                  <a
                    href="https://wa.me/918265892437"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all group"
                    aria-label="WhatsApp"
                  >
                    <svg 
                      className="group-hover:scale-110 transition-transform" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@ultimatesurvivalcampsite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all group"
                    aria-label="YouTube"
                  >
                    <Youtube className="group-hover:scale-110 transition-transform" size={20} />
                  </a>
              </div>
              </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
