import article1 from "@/assets/article-1.webp";
import article2 from "@/assets/article-2.webp";
import article3 from "@/assets/article-3.webp";
import heroSurvival from "@/assets/hero-survival.webp";
import mission from "@/assets/mission.webp";
import story1 from "@/assets/story-1.webp";
import story2 from "@/assets/story-2.webp";
import story3 from "@/assets/story-3.webp";
import story4 from "@/assets/story-4.webp";
import storyMain from "@/assets/story-main.webp";
import visit from "@/assets/visit.webp";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/ui/image-gallery";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

const allGalleryImages = [
  story1,
  story2,
  story3,
  story4,
  storyMain,
  heroSurvival,
  article1,
  article2,
  article3,
  visit,
  mission,
];

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState(allGalleryImages);

  useEffect(() => {
    const updateImages = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile: show 4 images (2x2 grid)
        setGalleryImages(allGalleryImages.slice(0, 4));
      } else if (width < 1024) {
        // Tablet: show 6 images
        setGalleryImages(allGalleryImages.slice(0, 6));
      } else if (width < 1280) {
        // Small desktop: show 8 images
        setGalleryImages(allGalleryImages.slice(0, 8));
      } else {
        // Large desktop: show all images
        setGalleryImages(allGalleryImages);
      }
    };

    updateImages();
    window.addEventListener("resize", updateImages);
    
    return () => window.removeEventListener("resize", updateImages);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-start py-16 bg-background">
      <div className="max-w-3xl text-center px-4 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-foreground">Our Latest Adventures</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          A visual collection of our most recent expeditions – each moment captured
          with intensity, courage, and the spirit of survival.
        </p>
      </div>

      <div className="w-full mt-12 px-2 sm:px-4">
        <ImageGallery images={galleryImages} />
      </div>

      <Button 
        variant="outline" 
        size="lg"
        className="mt-8 gap-2"
      >
        <Camera className="h-5 w-5" />
        See All Photos
      </Button>
    </section>
  );
};

export default GallerySection;
