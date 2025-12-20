import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Loader2, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";

interface GalleryImage {
  id: string;
  src: string;
  title?: string;
  category?: string;
}

// Gallery images with Cloudinary URLs
const allGalleryImages: GalleryImage[] = [
  { 
    id: "1", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261029/usc/gal2_gxkcpw.jpg", 
    title: "Buddha Statue", 
    category: "Nature" 
  },
  { 
    id: "2", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261036/usc/gal4_pclcyc.jpg", 
    title: "Buddha Garden", 
    category: "Nature" 
  },
  { 
    id: "5", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261024/usc/gal8_qryroz.jpg", 
    title: "Clay Workshop", 
    category: "Training" 
  },
  { 
    id: "6", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261023/usc/gal9_lhg0na.jpg", 
    title: "Cottage Stay", 
    category: "Stay" 
  },
  { 
    id: "7", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261097/usc/gal10_y2pdpb.jpg", 
    title: "Elephant", 
    category: "Nature" 
  },
  { 
    id: "8", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261049/usc/gal12_p4eas0.jpg", 
    title: "Firewood Collection", 
    category: "Training" 
  },
  { 
    id: "9", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261049/usc/gal13_mbwnya.jpg", 
    title: "Farm Animals", 
    category: "Stay" 
  },
  { 
    id: "10", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261056/usc/gal14_o9a14k.jpg", 
    title: "Camp House", 
    category: "Stay" 
  },
  { 
    id: "11", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261052/usc/gal15_ohjtpk.jpg", 
    title: "Mountain Hut", 
    category: "Stay" 
  },
  { 
    id: "12", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261079/usc/gal16_tg2gto.jpg", 
    title: "Evening Ambiance", 
    category: "Stay" 
  },
  { 
    id: "13", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261080/usc/gal17_cyyxrv.jpg", 
    title: "Camp Lunch", 
    category: "Stay" 
  },
  { 
    id: "14", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261098/usc/gal18_bhhosi.jpg", 
    title: "Colonel Hut", 
    category: "Stay" 
  },
  { 
    id: "15", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261079/usc/gal19_axk0xs.jpg", 
    title: "Camp Fire Pit", 
    category: "Training" 
  },
  { 
    id: "16", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261092/usc/gal20_h5gsq3.jpg", 
    title: "Garden Plants", 
    category: "Nature" 
  },
  { 
    id: "17", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261095/usc/gal21_bdldj8.jpg", 
    title: "Natural Pond", 
    category: "Nature" 
  },
  { 
    id: "18", 
    src: "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261102/usc/gal22_grwv0a.jpg", 
    title: "Guest Room", 
    category: "Stay" 
  },
 
];

// Hero image from Cloudinary
const heroImage = "https://res.cloudinary.com/duhadnqmh/image/upload/v1766261236/usc/story-main-2_falrsy.jpg";

const categories = ["All", "Adventure", "Training", "Nature", "Skills", "Events", "Stay", "About"];

const ITEMS_PER_PAGE = 6;

// Memoized Gallery Image Item Component
const GalleryImageItem = memo(({ 
  image, 
  idx, 
  onImageClick 
}: { 
  image: GalleryImage; 
  idx: number; 
  onImageClick: (image: GalleryImage) => void;
}) => {
  const isBuddhaMeditation = image.id === "4" || image.title === "Buddha Meditation";
  const itemRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(idx < ITEMS_PER_PAGE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (idx < ITEMS_PER_PAGE) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "300px" }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [idx]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleClick = useCallback(() => {
    onImageClick(image);
  }, [image, onImageClick]);

  if (!shouldLoad) {
    return (
      <div
        ref={itemRef}
        className="aspect-square bg-secondary/20 rounded-2xl"
        style={{ contentVisibility: 'auto' }}
      />
    );
  }

  return (
    <div
      ref={itemRef}
      className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-secondary/10"
      onClick={handleClick}
      style={{ 
        contain: 'layout style paint',
        contentVisibility: idx > ITEMS_PER_PAGE * 3 ? 'auto' : undefined
      }}
    >
      <img
        src={image.src}
        alt={image.title || `Gallery image ${idx + 1}`}
        className={`w-full h-full object-cover ${
          isBuddhaMeditation ? 'rotate-[-90deg]' : ''
        } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={idx < ITEMS_PER_PAGE ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={idx < 4 ? "high" : "low"}
        onLoad={handleImageLoad}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.image.id === nextProps.image.id && 
         prevProps.idx === nextProps.idx;
});

GalleryImageItem.displayName = 'GalleryImageItem';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") {
      return allGalleryImages;
    }
    return allGalleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setDisplayedImages(filteredImages.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
    setHasMore(filteredImages.length > ITEMS_PER_PAGE);
  }, [filteredImages]);

  const loadMoreImages = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    requestAnimationFrame(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newImages = filteredImages.slice(startIndex, endIndex);

      if (newImages.length > 0) {
        setDisplayedImages(prev => {
          const existingIds = new Set(prev.map(img => img.id));
          const uniqueNew = newImages.filter(img => !existingIds.has(img.id));
          return [...prev, ...uniqueNew];
        });
        setCurrentPage(nextPage);
        setHasMore(endIndex < filteredImages.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    });
  }, [currentPage, isLoading, hasMore, filteredImages]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!hasMore || isLoading) return;

    const observerOptions = {
      threshold: 0.01,
      rootMargin: "500px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        loadMoreImages();
      }
    }, observerOptions);

    const currentLoader = loaderRef.current;
    if (currentLoader && observerRef.current) {
      observerRef.current.observe(currentLoader);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasMore, isLoading, loadMoreImages]);

  const handleImageClick = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-3 px-3 pb-12">
        <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
            <img
              src={heroImage}
              alt="Gallery"
              className="w-full h-full object-cover opacity-90"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-earth-dark/90 to-forest-medium/85" />
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in-up mb-4 sm:mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 md:mb-8 border border-primary-foreground/30">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary-foreground">Visual Stories</span>
                </div>
              </div>
              
              <div className="animate-fade-in-up mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
                  Where Every Corner Tells <span className="text-primary">Stories</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                  Explore the enchanting spaces of our survival campsite, crafted to inspire your imagination. 
                  From awe-inspiring wilderness experiences to unforgettable moments captured in time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            style={{ contain: 'layout style' }}
          >
            {displayedImages.map((image, idx) => (
              <GalleryImageItem
                key={image.id}
                image={image}
                idx={idx}
                onImageClick={handleImageClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {displayedImages.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">No images found in this category</p>
            </div>
          )}

          {/* Infinite Scroll Loader */}
          <div ref={loaderRef} className="flex justify-center items-center py-12">
            {isLoading && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading more images...</p>
              </div>
            )}
            {!hasMore && displayedImages.length > 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You've reached the end of the gallery</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          style={{ 
            willChange: 'opacity',
            contain: 'layout style paint'
          }}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <img
              src={selectedImage.src}
              alt={selectedImage.title || "Gallery image"}
              className="max-w-full max-h-full object-contain rounded-lg"
              style={(selectedImage.id === "4" || selectedImage.title === "Buddha Meditation") ? { transform: 'rotate(-90deg)' } : {}}
              onClick={(e) => e.stopPropagation()}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            {/* Navigation Arrows */}
            {displayedImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = displayedImages.findIndex(img => img.id === selectedImage.id);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : displayedImages.length - 1;
                    setSelectedImage(displayedImages[prevIndex]);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowRight className="w-6 h-6 text-white rotate-180" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = displayedImages.findIndex(img => img.id === selectedImage.id);
                    const nextIndex = currentIndex < displayedImages.length - 1 ? currentIndex + 1 : 0;
                    setSelectedImage(displayedImages[nextIndex]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 relative z-10 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="text-primary" size={18} />
              <span className="text-sm font-semibold text-primary">Join Our Community</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Your Own <span className="text-primary">Stories</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Become part of our visual gallery. Book your experience and add your adventures to our collection.
            </p>
            
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              Book Your Adventure
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;