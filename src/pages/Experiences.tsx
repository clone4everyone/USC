import heroSurvival from "@/assets/hero-survival.webp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";
import { ArrowRight, Sparkles, Footprints } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Experiences = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove("opacity-0");
          el.classList.add("opacity-100", "animate-fade-in");
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Group experiences by category
  const groupedExperiences = experiences.reduce((acc, experience) => {
    if (!acc[experience.category]) {
      acc[experience.category] = [];
    }
    acc[experience.category].push(experience);
    return acc;
  }, {} as Record<string, typeof experiences>);

  // Get all day hikes
  const dayHikes = experiences.filter(exp => exp.category === "Day Hikes");

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-3 px-3 pb-12">
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
            <img
              src={heroSurvival}
              alt="Experiences"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/90 via-earth-dark/85 to-forest-medium/80" />
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in-up mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 animate-float border border-primary-foreground/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary-foreground">Our Activities</span>
                </div>
              </div>
              
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
                  Choose Your <span className="text-primary">Activity</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                  Transformative activities designed to inspire, challenge, and reconnect you with nature
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full sm:w-auto"
                >
                  Explore Activities
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
              <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences by Category */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          {Object.entries(groupedExperiences).map(([category, categoryExperiences], categoryIdx) => (
            <div key={category} ref={addToRefs} className="mb-16 opacity-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-16 bg-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">{category}</h2>
                <div className="h-px flex-1 bg-primary" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category === "Day Hikes" ? (
                  // Special rendering for Day Hikes - single card that navigates to page
                  <div
                    onClick={() => navigate("/day-hikes")}
                    className="group block cursor-pointer"
                  >
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl">
                      {/* Background Image - use first hike image */}
                      <img
                        src={dayHikes[0]?.image || ""}
                        alt="Day Hikes"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Dark overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                      
                      {/* Solid block overlay with text */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="bg-background/95 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-xl">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                            <Footprints className="text-primary" size={24} />
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">
                            Day Hikes
                          </h3>
                          
                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                            Choose from multiple scenic day hike options. Click to explore all available hikes.
                          </p>

                          {/* Learn More Button */}
                          <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                            <span className="text-sm font-medium">View All Hikes</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular rendering for other categories
                  categoryExperiences.map((experience, idx) => {
                    const Icon = experience.icon;
                    return (
                      <Link
                        key={experience.id}
                        to={`/activities/${experience.id}`}
                        className="group block"
                      >
                        <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl">
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
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="max-w-3xl mx-auto text-center opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether you're seeking adventure, wellness, or team building, we have the perfect activity for you.
            </p>
            
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg group">
              Book Your Activity
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Experiences;

