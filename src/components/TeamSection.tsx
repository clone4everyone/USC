import anujImage from "@/assets/Anuj.webp";
import vishalImage from "@/assets/Vishal.webp";
import { Award, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TeamSection = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Col. Anuj Sharma (Retd.)",
      role: "Special Forces Veteran",
      description: "Veteran of the 48 Armoured Regiment and Special Group (SFF), who led high-altitude ops in Siachen, mastered guerrilla, jungle & desert warfare, and served 33 decorated years",
      image: anujImage,
      delay: "0.1s",
    },
    {
      name: "Lt. Col. Vishal Sharma (Retd.)",
      role: "Military Operations Expert",
      description: "NDA alumnus who served with the Gorkhas, and as an instructor at the Commando Wing & Black Cat NSG, led UN missions, and experienced in challenging deployments across Siachen, Manipur, and J&K",
      image: vishalImage,
      delay: "0.2s",
    },
  ];

  return (
    <section ref={sectionRef} id="team" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Users className="text-primary" size={20} />
            <span className="text-sm font-semibold text-primary">Meet Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Expert <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our team brings together decades of military expertise, hospitality excellence, and youth leadership to create transformative wilderness experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? member.delay : "0s",
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    member.name.includes("Col. Anuj") ? "object-[50%_25%]" : "object-center"
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 -mt-16 relative z-10">
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <Award className="text-primary" size={24} />
                </div>

                {/* Name and Role */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary">
                    {member.role}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {member.description}
                </p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
