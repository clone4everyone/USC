import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";
import { ArrowLeft, ArrowRight, Footprints } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DayHikes = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dayHikes = experiences.filter(exp => exp.category === "Day Hikes");

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-3 px-3 pb-12">
        <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
            <img
              src={dayHikes[0]?.image || ""}
              alt="Day Hikes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/90 via-earth-dark/85 to-forest-medium/80" />
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Activities</span>
            </Link>

            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in-up mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 border border-primary-foreground/30">
                  <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary-foreground">Scenic Day Hikes</span>
                </div>
              </div>
              
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
                  Day <span className="text-primary">Hikes</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                  Choose from our selection of scenic day hikes. Each offers unique experiences and breathtaking views.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Hikes Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dayHikes.map((hike, idx) => {
              const Icon = hike.icon;
              return (
                <div
                  key={hike.id}
                  ref={addToRefs}
                  className="opacity-0"
                >
                  <Link
                    to={`/activities/${hike.id}`}
                    className="group block"
                  >
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl">
                      {/* Background Image */}
                      <img
                        src={hike.image}
                        alt={hike.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="bg-background/95 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-xl">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                            <Icon className="text-primary" size={24} />
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">
                            {hike.title.replace("Day Hike - ", "")}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed mb-4 text-sm line-clamp-3">
                            {hike.description}
                          </p>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between">
                            {hike.price && (
                              <span className="text-lg font-semibold text-primary">{hike.price}</span>
                            )}
                            <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                              <span className="text-sm font-medium">View Details</span>
                              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div ref={addToRefs} className="max-w-3xl mx-auto text-center opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Hike?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Choose your perfect day hike and experience the beauty of the mountains.
            </p>
            
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg group"
              onClick={() => {
                document.getElementById("day-hikes-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore All Hikes
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DayHikes;

