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

<div className="w-full max-w-6xl mx-auto">
  <video
    src="https://res.cloudinary.com/duhadnqmh/video/upload/v1766266104/training-1_juqcgj.mp4"
    autoPlay
    muted
    loop
    playsInline
    controls
    className="w-full h-auto rounded-xl"
  />
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

