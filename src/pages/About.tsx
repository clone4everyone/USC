import anujImage from "@/assets/Anuj.webp";
import heroSurvival from "@/assets/hero-survival.webp";
import rajeev from "@/assets/rajeev.png"
import karmaImage from "@/assets/Karma.webp";
import missionImage from "@/assets/mission.webp";
import priyanshuImage from "@/assets/Priyanshu.webp";
import storyMain from "@/assets/story-main.webp";
import vishalImage from "@/assets/Vishal.webp";
import CommitmentSection from "@/components/CommitmentSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Shield, Sparkles, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const About = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
const staffImages=[
  'https://res.cloudinary.com/duhadnqmh/image/upload/v1766566778/Screenshot_103_tkal8p.png', 
  'https://res.cloudinary.com/duhadnqmh/image/upload/v1766566778/Screenshot_104_j7ukty.png', 
  'https://res.cloudinary.com/duhadnqmh/image/upload/v1766566777/Screenshot_105_h0wnga.png',
  'https://res.cloudinary.com/duhadnqmh/image/upload/v1766566773/Screenshot_2025-12-24_142712_ezcleh.png',
 'https://res.cloudinary.com/duhadnqmh/image/upload/v1766566772/Screenshot_2025-12-24_142616_umjlfh.png'
]
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
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
            <img
              src={storyMain}
              alt="About Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/90 via-earth-dark/85 to-forest-medium/80" />
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in-up mb-4 sm:mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 md:mb-8 border border-primary-foreground/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary-foreground">About Us</span>
                </div>
              </div>
              
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight px-2">
                  Where Adventure Meets <span className="text-primary">Growth</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                  Empowering individuals through wilderness skills, outdoor education, and unforgettable activities since 2015
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div ref={addToRefs} className="max-w-4xl mx-auto opacity-0">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-6 py-3 rounded-full mb-6 backdrop-blur-sm shadow-lg">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Our Story</span>
              </div>
              {/* <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Rooted in Passion, Growing with <span className="text-primary">Purpose</span>
              </h2> */}
            </div>
            
            <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-8 md:p-12 shadow-xl border-2 border-primary/20 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-tr-full blur-2xl" />
              
              <div className="relative z-10">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  Founded in 2015 by a group of outdoor enthusiasts and survival experts, Ultimate Survival Campsite began with a simple mission: to reconnect people with nature and equip them with essential wilderness skills. What started as weekend workshops has grown into a comprehensive outdoor education center serving thousands of adventurers each year.Founded by Ex-Army military officers and seasoned adventure professionals, Ultimate Survival Campsite was created with a clear belief:
real strength is built when comfort is stripped away.

Nestled in the mountains of Himachal Pradesh, the campsite is not a resort and not a typical getaway. It is a training ground — where discipline meets nature, and individuals are challenged to reconnect with their bodies, minds, and instincts.

What began as structured survival and wilderness training has grown into a space for physical resilience, mental clarity, leadership, and self-discovery. Every activity — from survival drills and self-defense to mindful living and nature immersion — is rooted in real military experience and practical life skills.

At Ultimate Survival Campsite, people don’t come to escape life.
They come to face it — and leave stronger.
                </p>
                
                <p className="text-lg text-foreground leading-relaxed">
                  We believe that spending time in nature isn't just about survival—it's about discovering your strengths, building confidence, and creating lasting memories. Every experience we offer is designed to challenge, inspire, and transform our participants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-24 bg-secondary/30 relative z-10">
        <div className="container px-6">
          <div ref={addToRefs} className="opacity-0">
            {/* <div className="text-center mb-16">
              <p className="text-lg text-muted-foreground mb-4">
                Discover the <span className="font-bold text-foreground">principles</span> guiding us
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                toward a <span className="text-primary">stronger future</span>
              </h2>
            </div> */}

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src='https://res.cloudinary.com/duhadnqmh/image/upload/v1766568599/Screenshot_2025-12-24_145842_qwlzhc.png'
                    alt="Our mission"
                    className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-transparent rounded-3xl pointer-events-none" />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="text-primary" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold">Our Mission and Vision</h3>
                </div>

               
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At Ultimate Survival Campsite, we believe in the power of nature, discipline, and community to transform the way people live and grow.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our mission is to create a self-sustaining ecosystem where people can pause, breathe, and rebuild their inner strength - physically, mentally, and emotionally.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We envision a world where people live in rhythm with the earth - grounded in simplicity, guided by resilience, and connected through shared activities.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Through nature-based learning, mindful living, and the wisdom of disciplined living, we strive to help every person rediscover balance, not as an escape from life, but as a way of living it fully.
            </p>

                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 group"
                >
                  Discover our activities
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div ref={addToRefs} className="opacity-0">
          <CommitmentSection />
        </div>
      </section>

      {/* Full Team Section */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container px-6 relative z-10">
          <div ref={addToRefs} className="opacity-0">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
                <Users className="text-primary" size={20} />
                <span className="text-sm font-semibold text-primary">Meet Our Team</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Complete <span className="text-primary">Team</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team brings together decades of military expertise, hospitality excellence, and youth leadership to create transformative wilderness activities.
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
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
                {
                  name: "Mrs Karma Wangmo",
                  role: "Campsite Director",
                  description: "With 25+ years in tourism & hospitality, she now leads the campsite, blending expertise in permaculture, heritage, and sustainable living.",
                  image: karmaImage,
                  delay: "0.3s",
                },
                   {
                  name: "Hol. Rajeev Kumar (Retd.)",
                  role: "",
                  description: "With 27 years of distinguished service in the Indian Navy, SLT Rajeev Kumar brings unmatched expertise in physical training, discipline, and performance coaching. A certified Physical Training Instructor, he specializes in advanced training techniques, indoor & outdoor sports conditioning, yoga, swimming, and recreation-based learning.His experience shapes participants with the perfect balance of strength, stamina, and mental focus — the kind only a military trainer can deliver.",
                  image: rajeev,
                  delay: "0.3s",
                },
                {
                  name: "Priyanshu Suri",
                  role: "Youth Leader & Wellness Advocate",
                  description: "Youth leader and Health and wellness advocate passionate about personal transformation and purpose-driven growth. Having represented India at the Asia Youth Summit and later served as a committee co-chair, he continues to build global connections rooted in leadership, discipline, and resilience — qualities strengthened through years of MMA training",
                  image: priyanshuImage,
                  delay: "0.4s",
                },
              ].map((member, index) => (
                <div
  key={index}
  className={`group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500
    ${index === 4 ? "lg:col-span-2 lg:col-start-2" : ""}
  `}
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

            {/* Camp Staff Section */}


          </div>
          
        </div>
      </section>
<div className="mt-24">
  {/* Header */}
  <div className="text-center mb-14 max-w-2xl mx-auto">
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm">
      <Users className="text-accent" size={20} />
      <span className="text-sm font-semibold text-accent">Our Camp Staff</span>
    </div>

    <h3 className="text-3xl md:text-4xl font-bold mb-4">
      The <span className="text-primary">Backbone</span> of Our Camps
    </h3>

    <p className="text-lg text-muted-foreground leading-relaxed">
      Trained, disciplined, and deeply connected to the land — our camp staff
      ensures every experience runs smoothly, safely, and with heart.
    </p>
  </div>

  {/* Staff Grid */}
  <div className="grid grid-cols-1 pb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
    {[
      { name: "Rahul", role: "Camp Operations" },
      { name: "Terloki Devi", role: "Outdoor Instructor" },
      { name: "Seema", role: "Survival Assistant" },
      { name: "Sahil Heer", role: "Logistics & Support" },
      { name: "Nitish Kumar", role: "Activity Coordinator" },
    ].map((staff, index) => (
      <div
        key={index}
        className="group bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src={staffImages[index]}
            alt={staff.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-center">
          <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
            {staff.name}
          </h4>
          {/* <p className="text-sm font-semibold text-muted-foreground">
            {staff.role}
          </p> */}
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
      </div>
    ))}
  </div>
</div>
      {/* Stats Section */}
      <section className="py-24 relative z-10 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div ref={addToRefs} className="max-w-4xl mx-auto text-center opacity-0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Our Impact in <span className="text-primary">Numbers</span>
            </h2>
            
            <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-12 border-2 border-primary/20 shadow-2xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-bl-full blur-2xl" />
              
              <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {[
                  { number: "10+", label: "Years Experience", icon: Shield, color: "primary" },
                  { number: "5000+", label: "Happy Campers", icon: Users, color: "accent" },
                  { number: "50+", label: "Expert Instructors", icon: Award, color: "primary" },
                  { number: "100+", label: "Activities Offered", icon: Sparkles, color: "accent" }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  const isPrimary = stat.color === "primary";
                  return (
                    <div key={idx} className="text-center group">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${isPrimary ? 'from-primary/20 to-primary/10' : 'from-accent/20 to-accent/10'} flex items-center justify-center mx-auto mb-4 border-2 ${isPrimary ? 'border-primary/30' : 'border-accent/30'} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-10 h-10 ${isPrimary ? 'text-primary' : 'text-accent'}`} />
                      </div>
                      <div className={`text-5xl font-bold ${isPrimary ? 'text-primary' : 'text-accent'} mb-2`}>{stat.number}</div>
                      <div className="text-sm text-foreground font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div ref={addToRefs} className="max-w-4xl mx-auto opacity-0">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/30 px-6 py-3 rounded-full mb-6 backdrop-blur-sm shadow-lg">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose <span className="text-primary">Us</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Expert Instructors",
                  description: "Learn from certified wilderness survival experts with decades of combined experience in outdoor education, emergency response, and adventure leadership.",
                  icon: Award,
                  gradient: "from-primary/20 to-primary/10",
                  border: "border-primary/30",
                  iconColor: "text-primary"
                },
                {
                  title: "Safe & Supportive Environment",
                  description: "We maintain the highest safety standards while creating a welcoming atmosphere where everyone can learn, grow, and challenge themselves at their own pace.",
                  icon: Shield,
                  gradient: "from-accent/20 to-accent/10",
                  border: "border-accent/30",
                  iconColor: "text-accent"
                },
                {
                  title: "Comprehensive Activities",
                  description: "From beginner-friendly introductions to advanced wilderness skills, we offer activities for all ages and experience levels throughout the year.",
                  icon: Sparkles,
                  gradient: "from-primary/20 to-primary/10",
                  border: "border-primary/30",
                  iconColor: "text-primary"
                },
                {
                  title: "Beautiful Locations",
                  description: "Experience the magic of pristine wilderness areas carefully selected for their natural beauty, diverse ecosystems, and ideal learning environments.",
                  icon: Users,
                  gradient: "from-accent/20 to-accent/10",
                  border: "border-accent/30",
                  iconColor: "text-accent"
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 shadow-xl border-2 ${item.border} hover:shadow-2xl transition-all hover:scale-[1.02] group relative overflow-hidden`}>
                    {/* Decorative corner */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-bl-full opacity-50`} />
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/70 transition-colors border-2 ${item.border} shadow-lg`}>
                        <Icon className={`w-8 h-8 ${item.iconColor}`} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 ${item.iconColor} transition-colors`}>{item.title}</h3>
                      <p className="text-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div ref={addToRefs} className="max-w-3xl mx-auto text-center opacity-0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/25 to-accent/25 border-2 border-primary/40 px-6 py-3 rounded-full mb-6 backdrop-blur-sm shadow-xl">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Join Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-primary">Adventure</span>?
            </h2>
            
            <p className="text-xl text-foreground mb-8 leading-relaxed">
              Whether you're a complete beginner or an experienced outdoors enthusiast, we have the perfect activity waiting for you.
            </p>
            
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:scale-105 rounded-full px-10 py-6 text-lg group">
              Explore Our Activities
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
