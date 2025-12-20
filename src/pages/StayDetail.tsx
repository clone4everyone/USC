import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { accommodations, getAccommodationById } from "@/data/accommodations";
import { ArrowLeft, ArrowRight, CheckCircle, Home, Leaf, Mountain, TreePine } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const StayDetail = () => {
  const { id } = useParams<{ id: string }>();
  const accommodation = id ? getAccommodationById(id) : undefined;
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  if (!accommodation) {
    return <Navigate to="/stay" replace />;
  }

  const Icon = accommodation.natureIcon;
  
  // Get related accommodations (same type, excluding current)
  const relatedAccommodations = accommodations
    .filter(acc => acc.type === accommodation.type && acc.id !== accommodation.id)
    .slice(0, 3);

  const handleBook = () => {
    const phoneNumber = "918265892437";
    let message = `Hello! I'm interested in booking accommodation.\n\n`;
    
    message += `*Accommodation Details:*\n`;
    message += `Type: *${accommodation.name}*\n`;
    message += `Category: ${accommodation.type}\n`;
    message += `${accommodation.description}\n\n`;
    
    message += `*Pricing:*\n`;
    message += `Single Occupancy: ${accommodation.singlePrice}\n`;
    message += `Twin Occupancy: ${accommodation.twinPrice}\n`;
    if (accommodation.additionalPersonPrice) {
      message += `Additional Person: ${accommodation.additionalPersonPrice}\n`;
    }
    message += `*All rates exclude government taxes\n\n`;
    
    message += `*Key Features:*\n`;
    accommodation.features.forEach((feature) => {
      message += `• ${feature}\n`;
    });
    message += `\n`;
    
    message += `*Facilities & Amenities:*\n`;
    accommodation.facilities.forEach((facility) => {
      message += `• ${facility}\n`;
    });
    message += `\n`;
    
    message += `Please let me know about availability and booking details. Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0">
          <img
            src={accommodation.image}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        
        <div className="container relative z-10 px-6 py-16 pb-24">
          <Link
            to="/stay"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Stay</span>
          </Link>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/30">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">{accommodation.type}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {accommodation.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {accommodation.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {accommodation.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Facilities & Amenities */}
              <div ref={addToRefs} className="opacity-0">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  Facilities & Amenities
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {accommodation.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border border-border/30">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery - All Images */}
              <div ref={addToRefs} className="opacity-0">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <Home className="w-6 h-6 text-primary" />
                  More Images
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Main image first */}
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-border/30 group cursor-pointer hover:border-primary/50 transition-colors">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Gallery images */}
                  {accommodation.galleryImages && accommodation.galleryImages.map((galleryImage, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden rounded-xl border border-border/30 group cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <img
                        src={galleryImage}
                        alt={`${accommodation.name} - Image ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Booking */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div ref={addToRefs} className="opacity-0 bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-xl sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Pricing Details</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="font-medium">Single Occupancy</span>
                    <span className="text-xl font-bold text-primary">{accommodation.singlePrice}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="font-medium">Twin Occupancy</span>
                    <span className="text-xl font-bold text-primary">{accommodation.twinPrice}</span>
                  </div>
                  {accommodation.additionalPersonPrice && (
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium">Additional Person</span>
                      <span className="text-xl font-bold text-primary">{accommodation.additionalPersonPrice}</span>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                      * All rates exclude government taxes
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleBook}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Book This Accommodation
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Accommodations */}
      {relatedAccommodations.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container px-6">
            <div ref={addToRefs} className="opacity-0 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Other {accommodation.type} Options</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedAccommodations.map((acc) => {
                  const RelatedIcon = acc.natureIcon;
                  return (
                    <Link
                      key={acc.id}
                      to={`/stay/${acc.id}`}
                      className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={acc.image}
                          alt={acc.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border/40">
                          <RelatedIcon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                          <span className="text-xs font-medium text-primary">{acc.type}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {acc.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {acc.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default StayDetail;

