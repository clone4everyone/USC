import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { experiences, getExperienceById } from "@/data/experiences";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, Clock, Users } from "lucide-react";
import { Download } from "lucide-react"
import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CustomEventBookingForm from "@/components/CustomEventBookingForm";

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const experience = id ? getExperienceById(id) : undefined;
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

  if (!experience) {
    return <Navigate to="/activities" replace />;
  }

  const Icon = experience.icon;
  
  // Get related experiences (same category, excluding current)
  const relatedExperiences = experiences
    .filter(exp => exp.category === experience.category && exp.id !== experience.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        
        <div className="container relative z-10 px-6 py-16 pb-24">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Activities</span>
          </Link>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/30">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">{experience.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {experience.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {experience.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              {experience.duration && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">{experience.duration}</span>
                </div>
              )}
              {experience.price && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm text-white font-semibold">{experience.price}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          {experience.isCustom ? (
            // Custom Experience - Booking Form
            <div className="max-w-5xl mx-auto">
              <div ref={addToRefs} className="opacity-0 mb-8">
                <h2 className="text-3xl font-bold mb-4">About This Experience</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {experience.fullDescription}
                </p>
              </div>
              
              {experience.highlights && experience.highlights.length > 0 && (
                <div ref={addToRefs} className="opacity-0 mb-12">
                  <h2 className="text-3xl font-bold mb-6">What You Can Customize</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {experience.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <div ref={addToRefs} className="opacity-0">
                <CustomEventBookingForm />
              </div>
            </div>
          ) : (
            // Regular Experience Details
            <div className="grid md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-12">
                {experience.fullDescription && (
                  <div ref={addToRefs} className="opacity-0">
                    <h2 className="text-3xl font-bold mb-6">About This Experience</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {experience.fullDescription}
                    </p>
                  </div>
                )}

                {experience.highlights && experience.highlights.length > 0 && (
                  <div ref={addToRefs} className="opacity-0">
                    <h2 className="text-3xl font-bold mb-6">Highlights</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {experience.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="sticky top-24 space-y-6">
                 <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Experience Details</h3>
                    {
                      experience.title !== "Water Sports"  &&  <div className="space-y-4">
                      {experience.duration && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold">{experience.duration}</p>
                          </div>
                        </div>
                      )}
                      
                      {experience.price && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="font-semibold">{experience.price}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-semibold">{experience.category}</p>
                        </div>
                      </div>
                    </div>
                    }
                   
                    {/* Download PDF Button */}
                    {
                       experience.id === "water-sports-karma"  ?  <Button
                      size="lg"
                      variant="outline"
                      className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        // Convert Google Drive view link to direct download link
                        const fileId = "1ktxMGD3Hu4897FicUW8FM9R5rIaxqTB8";
                        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                        window.open(downloadUrl, '_blank');
                      }}
                    >
                      <Download className="mr-2 w-5 h-5" />
                     Click For More Detail
                    </Button> : ""
                    }
                  

                    <Button
                      size="lg"
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => {
                        const phoneNumber = "918265892437";
                        const message = `Hello! I'm interested in booking: *${experience.title}*

${experience.category ? `Category: ${experience.category}` : ''}
${experience.duration ? `Duration: ${experience.duration}` : ''}
${experience.price ? `Price: ${experience.price}` : ''}

${experience.description ? `\n${experience.description}` : ''}

Please let me know about availability and booking details. Thank you!`;

                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                    >
                      Book This Experience
                      <ArrowRight className="ml-2" />
                    </Button>
                  </div>

                  {experience.includes && experience.includes.length > 0 && (
                    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                      <h3 className="text-xl font-bold mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {experience.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
        </div>
      </section>
      {/* Instagram Reels Section - Only for Military Survival Training */}
      {experience.id === "military-survival-training" && (
        <section className="py-24 relative z-10 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div ref={addToRefs} className="opacity-0 mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience It Yourself</h2>
              <p className="text-muted-foreground">
                Watch highlights from our military survival training sessions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  url: "https://www.instagram.com/reel/DRAOe3lj90e/?igsh=MTVwMnp1cGVjMWVweQ==",
                  title: "Training Highlight 1"
                },
                {
                  url: "https://www.instagram.com/reel/DREOI_Dj-Kr/?igsh=cGg3aGhqNzU0aWc5",
                  title: "Training Highlight 2"
                },
                {
                  url: "https://www.instagram.com/reel/DR15sVRj0Ug/?igsh=MTFlbWc0MXYwYjVmdw==",
                  title: "Training Highlight 3"
                }
              ].map((reel, idx) => (
                <div key={idx} ref={addToRefs} className="opacity-0">
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20">
                      {/* Instagram Icon Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <svg
                            className="w-12 h-12"
                            fill="url(#instagram-gradient)"
                            viewBox="0 0 24 24"
                          >
                            <defs>
                              <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f09433" />
                                <stop offset="25%" stopColor="#e6683c" />
                                <stop offset="50%" stopColor="#dc2743" />
                                <stop offset="75%" stopColor="#cc2366" />
                                <stop offset="100%" stopColor="#bc1888" />
                              </linearGradient>
                            </defs>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div className="text-center px-4">
                          <p className="text-white font-semibold text-lg mb-2">{reel.title}</p>
                          <p className="text-white/80 text-sm">Click to watch on Instagram</p>
                        </div>
                      </div>
                      
                      {/* Play Button */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Related Experiences */}
      {relatedExperiences.length > 0 && (
        <section className="py-24 bg-secondary/30 relative z-10">
          <div className="container mx-auto px-6">
            <div ref={addToRefs} className="opacity-0 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Experiences</h2>
              <p className="text-muted-foreground">
                Explore other {experience.category.toLowerCase()} experiences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedExperiences.map((relatedExp) => {
                const RelatedIcon = relatedExp.icon;
                return (
                  <Link
                    key={relatedExp.id}
                    to={`/experiences/${relatedExp.id}`}
                    className="group block"
                  >
                    <div className="relative h-[300px] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl">
                      <img
                        src={relatedExp.image}
                        alt={relatedExp.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                            <RelatedIcon className="text-primary" size={20} />
                          </div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors text-foreground">
                            {relatedExp.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedExp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ExperienceDetail;

