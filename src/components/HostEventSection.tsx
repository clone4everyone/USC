import { Button } from "@/components/ui/button";
import { Calendar, Handshake, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HostEventSection = () => {
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

  const handleCollaborate = () => {
    const phoneNumber = "918265892437";
    const message = "i want to organise a event with u";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background with texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20" />
      <div className="absolute inset-0 opacity-30" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6 backdrop-blur-sm">
              <Calendar className="text-primary" size={16} />
              <span className="text-xs sm:text-sm font-semibold text-primary">Event Hosting</span>
              <Sparkles className="text-primary" size={16} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 px-2">
              Host Your Own <span className="text-primary">Event</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4 max-w-2xl mx-auto">
              Looking to organize a special event, team building activity, or group experience? 
              Let's collaborate to create an unforgettable adventure tailored to your needs.
            </p>
          </div>

          {/* Content Card */}
          <div className={`relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 md:p-14 lg:p-20 border-2 border-border/50 shadow-2xl transition-all duration-1000 delay-200 overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center space-y-8 sm:space-y-10 md:space-y-12">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/20 via-primary/15 to-accent/20 flex items-center justify-center border-4 border-primary/30 shadow-xl">
                      <Handshake className="text-primary" size={48} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <Sparkles className="text-primary-foreground" size={16} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-5 sm:space-y-6 max-w-3xl mx-auto">
                  <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                    Whether you're planning a corporate retreat, school trip, family gathering, or any special occasion, 
                    we're here to help you create a memorable experience in the wilderness.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Our team will work with you to customize activities, accommodations, and programs that fit your group's needs and goals.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4 sm:pt-6">
                  <Button
                    size="lg"
                    onClick={handleCollaborate}
                    className="w-full sm:w-auto rounded-full px-10 sm:px-12 md:px-16 py-7 sm:py-8 md:py-9 text-lg sm:text-xl md:text-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground border-2 border-primary/20"
                  >
                    <Handshake className="mr-3 sm:mr-4" size={24} />
                    Collaborate with Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostEventSection;

