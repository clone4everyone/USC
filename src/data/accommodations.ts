import tent1 from "@/assets/images/tent1.webp";
import tent2 from "@/assets/images/tent_2.webp";
import tent from "@/assets/images/tent.webp";
import cottage from "@/assets/images/cottage.webp";
import luxuryroom from "@/assets/images/luxuryroom.webp";
// Alpine Tent images
import at from "@/assets/images/at.webp";
import at1 from "@/assets/images/at_1.webp";
// Luxury Tent images
import lt from "@/assets/images/lt.webp";
import lt1 from "@/assets/images/lt_1.webp";
import lt2 from "@/assets/images/lt_2.webp";
// Colonel Hut images
import ch from "@/assets/images/ch.webp";
import ch1 from "@/assets/images/ch_1.webp";
import ch2 from "@/assets/images/ch_2.webp";
import ch3 from "@/assets/images/ch_3.webp";
import cht from "@/assets/images/ch_t.webp";
// Military Tent images
import mt from "@/assets/images/mt.webp";
import mt1 from "@/assets/images/mt_1.webp";
import mt2 from "@/assets/images/mt_2.webp";
import militaryTent from "@/assets/images/Military_tent.webp";
import { Leaf, Mountain, TreePine } from "lucide-react";

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  galleryImages?: string[];
  singlePrice: string;
  twinPrice: string;
  additionalPersonPrice: string | null;
  facilities: string[];
  features: string[];
  natureIcon: typeof Leaf;
  natureElement: string;
}

export const accommodations: Accommodation[] = [
  {
    id: "luxury-tent",
    name: "Luxury Tent",
    type: "Premium Glamping",
    description: "Experience the ultimate in outdoor luxury with our spacious, well-appointed luxury tents. Perfect for those who want comfort without compromising the authentic camping experience.",
    image: tent2,
    galleryImages: [lt, lt1, lt2],
    singlePrice: "₹8,000",
    twinPrice: "₹11,000",
    additionalPersonPrice: "₹3,500",
    facilities: [
      "Premium bedding and linens",
      "Private attached bathroom",
      "Hot water supply",
      "Electricity and charging points",
      "Comfortable seating area",
      "Room service available",
      "AC & Heater"
    
    ],
    features: ["Luxury comfort", "Private facilities", "Premium amenities", "Spacious design"],
    natureIcon: TreePine,
    natureElement: "forest"
  },
  {
    id: "alpine-tent",
    name: "Alpine Tent",
    type: "Mountain Comfort",
    description: "Designed for mountain enthusiasts, our Alpine Tents offer a perfect blend of rugged durability and comfort. Ideal for those seeking adventure with essential comforts.",
    image: tent1,
    galleryImages: [at, at1],
    singlePrice: "₹5,000",
    twinPrice: "₹8,000",
    additionalPersonPrice: "₹3,500",
    facilities: [
      "Comfortable bedding",
      "Shared bathroom facilities",
      "Hot water access",
      "Basic electricity",
      "Heating options",
      "Common area access"
    ],
    features: ["Mountain views", "Adventure ready", "Comfortable", "Scenic location"],
    natureIcon: Mountain,
    natureElement: "mountain"
  },
  {
    id: "safari-tent",
    name: "Safari Tent",
    type: "Group Adventure",
    description: "Perfect for groups and adventure seekers. Our Safari Tents provide a communal yet comfortable camping experience, ideal for families and groups traveling together.",
    image: tent,
    singlePrice: "₹3,500",
    twinPrice: "Group Only",
    additionalPersonPrice: "Group Only",
    facilities: [
      "Group accommodation setup",
      "Shared bathroom facilities",
      "Common dining area",
      "Group activity space",
      "Basic amenities",
      "Campfire area",
      "Group meal options",
      "Adventure activities included"
    ],
    features: ["Group friendly", "Adventure focus", "Communal experience", "Budget friendly"],
    natureIcon: TreePine,
    natureElement: "community"
  },
  {
    id: "military-tent",
    name: "Military Tent",
    type: "Survival Experience",
    description: "Authentic military-style accommodation for those seeking a true survival experience. Basic, functional, and perfect for adventure training and survival camps.",
    image: militaryTent,
    galleryImages: [mt, mt1, mt2],
    singlePrice: "₹2,500",
    twinPrice: "Group Only",
    additionalPersonPrice: "Group Only",
    facilities: [
      "Basic bedding",
      "Shared facilities",
      "Survival training area",
      "Group activities",
      "Campfire cooking",
      "Outdoor showers",
      "Training equipment",
      "Survival workshops"
    ],
    features: ["Authentic experience", "Survival training", "Group activities", "Adventure focus"],
    natureIcon: Mountain,
    natureElement: "wilderness"
  },
  {
    id: "colonel-hut",
    name: "Colonel Hut",
    type: "Premium Cabin",
    description: "Our most premium accommodation option. The Colonel Hut offers luxury cabin living with all modern amenities, perfect for those who want the best of both worlds.",
    image: luxuryroom,
    galleryImages: [ch, ch1, ch2, ch3, cht],
    singlePrice: "₹8,000",
    twinPrice: "₹12,000",
    additionalPersonPrice: "₹4,500",
    facilities: [
      "Luxury bedding and furnishings",
      "Private bathroom with hot water",
      "Full electricity and Wi-Fi",
      "Private kitchenette",
      "Living area",
      "Private balcony/patio",
      "Room service",
      "Premium amenities",
      "Climate control",
      "Entertainment options"
    ],
    features: ["Premium luxury", "Full facilities", "Private space", "Modern amenities"],
    natureIcon: TreePine,
    natureElement: "cabin"
  },
  {
    id: "pup-tent",
    name: "Pup Tent",
    type: "Minimalist Camping",
    description: "For the minimalist camper who wants the authentic outdoor experience. Simple, compact, and perfect for solo travelers or couples seeking a true camping adventure.",
    image: tent,
    singlePrice: "₹2,500",
    twinPrice: "₹4,000",
    additionalPersonPrice: null,
    facilities: [
      "Basic bedding",
      "Shared bathroom facilities",
      "Common area access",
      "Campfire area",
      "Basic storage",
      "Outdoor experience",
      "Nature immersion",
      "Minimal amenities"
    ],
    features: ["Authentic camping", "Minimalist", "Budget friendly", "Nature connection"],
    natureIcon: Leaf,
    natureElement: "minimal"
  }
];

export const getAccommodationById = (id: string): Accommodation | undefined => {
  return accommodations.find(acc => acc.id === id);
};

