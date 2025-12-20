import { useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // YouTube video embed URL with autoplay enabled
  const youtubeVideoId = "zrmZ2Hmc6Lg";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=1&mute=1&playsinline=1&modestbranding=1&rel=0`;

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  // Calculate parallax effect
  const getParallaxOffset = () => {
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollProgress = (scrollY + windowHeight - elementTop) / (windowHeight + rect.height);
    
    // Parallax effect: moves slower than scroll
    return Math.max(0, Math.min(1, scrollProgress)) * 50;
  };

  const parallaxOffset = getParallaxOffset();

  return (
    <section 
      id="video-section"
      ref={sectionRef}
      className="w-full py-16 px-4 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div 
          className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px) scale(${isVisible ? 1 : 0.95})`,
          }}
        >
          {/* YouTube Video Embed */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}> {/* 16:9 aspect ratio */}
            <iframe
              src={youtubeEmbedUrl}
              className="absolute top-0 left-0 w-full h-full rounded-3xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Experience the Adventure Video"
            />
          </div>
          
          {/* Animated border glow effect on scroll */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-1000"
            style={{
              opacity: isVisible ? 0.3 : 0,
              boxShadow: isVisible 
                ? `0 0 40px hsl(var(--primary) / 0.4), inset 0 0 20px hsl(var(--primary) / 0.1)` 
                : 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

