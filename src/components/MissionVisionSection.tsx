const missionImage = "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261233/usc/mission_s61qkm.webp";
import { Button } from "@/components/ui/button";
import { ArrowDown, Compass } from "lucide-react";

const MissionVisionSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-lg text-muted-foreground mb-4">
            Discover the <span className="font-bold text-foreground">principles</span> guiding us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            toward a <span className="text-primary">stronger future</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group animate-scale-in">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={missionImage}
                alt="Our mission"
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-transparent rounded-3xl pointer-events-none" />
          </div>

          {/* Content */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Compass className="text-primary" size={24} />
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
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;

