import article1 from "@/assets/article-1.webp";
import article2 from "@/assets/article-2.webp";
import article3 from "@/assets/article-3.webp";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar } from "lucide-react";

const ExploreSection = () => {
  const articles = [
    {
      image: article1,
      tag: "Training",
      title: "Ultimate Survival Skills Workshop: Master Fire, Shelter & Navigation",
      date: "June 15, 2025",
    },
    {
      image: article2,
      tag: "Event",
      title: "Summer Wilderness Challenge: 7-Day Immersive Survival Experience",
      date: "July 8, 2025",
    },
    {
      image: article3,
      tag: "Adventure",
      title: "Mountain Trek Expedition: Test Your Skills in Extreme Conditions",
      date: "August 22, 2025",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-12">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-primary">Explore</span> what we offer
            </h2>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 group"
            >
              See all experiences
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover upcoming training experiences, immersive wilderness experiences, and special
              events designed to challenge and transform you.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="group animate-scale-in"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-soft group-hover:shadow-medium transition-all">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-6 right-6">
                  <span className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-md">
                    {article.tag}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>

              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar size={16} className="mr-2" />
                {article.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
