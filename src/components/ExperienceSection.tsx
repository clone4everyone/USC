import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FEATURED_IDS = [
  "water-sports-karma",
  "brave-hearts-kids-camp",
  "self-discovery-retreat",
  "military-survival-training",
  "sustainable-farming-workshop", // Ancestral Agro-forested Retreat
  "farm-detox-retreat",
];

const getFeaturedExperiences = () => {
  return experiences.filter(exp => FEATURED_IDS.includes(exp.id));
};

const ExperienceSection = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featuredExperiences = getFeaturedExperiences();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove("opacity-0");
          el.classList.add("opacity-100");
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section);
      });
    });

    // Fallback: make visible after a short delay if observer doesn't trigger
    const fallbackTimeout = setTimeout(() => {
      sectionsRef.current.forEach((section) => {
        if (section && section.classList.contains("opacity-0")) {
          section.classList.remove("opacity-0");
          section.classList.add("opacity-100");
        }
      });
    }, 500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimeout);
      observer.disconnect();
    };
  }, [featuredExperiences]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="text-primary" size={18} />
            <span className="text-sm font-semibold text-primary">Our Activities</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Choose Your <span className="text-primary">Activity</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transformative activities designed to inspire, challenge, and reconnect you with nature
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredExperiences.map((experience, idx) => {
            const Icon = experience.icon;
            return (
              <Link
                key={experience.id}
                to={`/activities/${experience.id}`}
                className="group block"
              >
                <div 
                  ref={addToRefs}
                  className="opacity-0 relative h-[400px] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Background Image */}
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                  
                  {/* Solid block overlay with text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-xl">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="text-primary" size={24} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">
                        {experience.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {experience.description}
                      </p>

                      {/* Learn More Button */}
                      <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <Link to="/activities">
            <Button
              size="lg"
              className="rounded-full px-10 shadow-lg hover:shadow-xl transition-all group"
            >
              View All Activities
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
