import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (idx: number) => {
    setImageErrors((prev) => new Set(prev).add(idx));
    console.error(`Failed to load image at index ${idx}:`, images[idx]);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No images available
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center gap-2 md:gap-2 w-full md:h-[400px] h-auto", className)}>
      {images.map((src, idx) => {
        if (imageErrors.has(idx)) {
          return (
            <div
              key={idx}
              className="relative group flex-grow transition-all rounded-lg overflow-hidden md:h-[400px] h-[200px] sm:h-[250px] duration-500 md:hover:w-full md:w-56 w-full bg-muted flex items-center justify-center"
            >
              <span className="text-muted-foreground text-sm">Image {idx + 1}</span>
            </div>
          );
        }

        return (
          <div
            key={idx}
            className="relative group flex-grow transition-all rounded-lg overflow-hidden md:h-[400px] h-[200px] sm:h-[250px] duration-500 md:hover:w-full md:w-56 w-full"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={src}
              alt={`Gallery image ${idx + 1}`}
              onError={() => handleImageError(idx)}
              loading={idx < 6 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}
