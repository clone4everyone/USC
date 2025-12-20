import article1 from "@/assets/article-1.webp";
import article2 from "@/assets/article-2.webp";
import article3 from "@/assets/article-3.webp";
import heroSurvival from "@/assets/hero-survival.webp";
import mission from "@/assets/mission.webp";
import story1 from "@/assets/story-1.webp";
import story2 from "@/assets/story-2.webp";
import story3 from "@/assets/story-3.webp";
import story4 from "@/assets/story-4.webp";
import visit from "@/assets/visit.webp";
import { Building2, Calendar, GraduationCap, Heart, LucideIcon, Mountain, Sparkles, TreePine, Users, Waves, WifiOff, PenTool, Footprints, Baby } from "lucide-react";

export interface Experience {
  id: string;
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  image: string;
  fullDescription?: string;
  duration?: string;
  price?: string;
  includes?: string[];
  highlights?: string[];
  isCustom?: boolean; // For custom experience form
}

// Image array for distribution
const experienceImages = [story1, story2, story3, story4, article1, article2, article3, mission, visit, heroSurvival, story1, story2];

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const experiences: Experience[] = [
  // ========== ADVENTURE CATEGORY ==========
  {
    id: "water-sports-karma",
    icon: Waves,
    title: "Water Sports",
    category: "Adventure",
    description: "Thrilling water sports adventures including rafting, kayaking, and more on the pristine waters.",
    image: experienceImages[8],
    fullDescription: "Experience the ultimate water sports adventure. Navigate through exciting rapids, enjoy kayaking sessions, and participate in various water-based activities. Our certified guides ensure safety while you enjoy the thrill of water sports in beautiful natural settings.",
    duration: "2-3 Days",
    price: "Starting from ₹6,500",
    includes: [
      "All water sports equipment and safety gear",
      "Certified water sports instructors",
      "Accommodation",
      "All meals",
      "Adventure photography"
    ],
    highlights: [
      "White-water rafting",
      "Kayaking sessions",
      "Professional safety standards",
      "Beautiful river scenery",
      "Experienced guides"
    ]
  },
  {
    id: "day-hike-kakar-ludi",
    icon: Footprints,
    title: "Day Hike - Kakar Ludi",
    category: "Day Hikes",
    description: "Scenic day hike to Kakar Ludi, offering breathtaking views and a perfect introduction to mountain trekking.",
    image: experienceImages[0],
    fullDescription: "Embark on a beautiful day hike to Kakar Ludi, a scenic destination perfect for beginners and experienced hikers alike. Enjoy stunning mountain vistas, diverse flora and fauna, and the satisfaction of reaching a beautiful summit. This day hike is ideal for those looking to experience the mountains without committing to a multi-day trek.",
    duration: "1 Day",
    price: "Starting from ₹2,500",
    includes: [
      "Experienced trekking guide",
      "Basic trekking equipment",
      "Lunch and refreshments",
      "Transportation to trailhead",
      "First aid support"
    ],
    highlights: [
      "Breathtaking mountain views",
      "Moderate difficulty level",
      "Rich biodiversity",
      "Perfect for beginners",
      "Photography opportunities"
    ]
  },
  {
    id: "day-hike-kala-bhuu",
    icon: Footprints,
    title: "Day Hike - Kala Bhuu",
    category: "Day Hikes",
    description: "Challenging day hike to Kala Bhuu, featuring diverse terrain and spectacular panoramic views.",
    image: experienceImages[1],
    fullDescription: "Challenge yourself with a day hike to Kala Bhuu, known for its diverse terrain and spectacular views. This moderately challenging hike takes you through forests, meadows, and rocky sections, offering a complete mountain experience in a single day.",
    duration: "1 Day",
    price: "Starting from ₹2,800",
    includes: [
      "Experienced trekking guide",
      "Trekking poles and basic equipment",
      "Lunch and refreshments",
      "Transportation to trailhead",
      "First aid and safety support"
    ],
    highlights: [
      "Diverse terrain and landscapes",
      "Moderate to challenging difficulty",
      "Panoramic mountain views",
      "Rich natural environment",
      "Great for fitness enthusiasts"
    ]
  },
  {
    id: "day-hike-raj-mahal",
    icon: Footprints,
    title: "Day Hike - Raj Mahal",
    category: "Day Hikes",
    description: "Explore the historic Raj Mahal trail, combining natural beauty with cultural significance.",
    image: experienceImages[2],
    fullDescription: "Discover the historic Raj Mahal trail, where natural beauty meets cultural heritage. This day hike offers a unique combination of scenic mountain views and insights into local history, making it a perfect choice for those interested in both nature and culture.",
    duration: "1 Day",
    price: "Starting from ₹2,500",
    includes: [
      "Experienced guide with local knowledge",
      "Trekking equipment",
      "Lunch and refreshments",
      "Transportation",
      "Cultural insights and stories"
    ],
    highlights: [
      "Historic significance",
      "Beautiful natural scenery",
      "Cultural learning experience",
      "Moderate difficulty",
      "Photography opportunities"
    ]
  },
  {
    id: "day-hike-beas-riverside",
    icon: Footprints,
    title: "Day Hike - Beas Riverside",
    category: "Day Hikes",
    description: "Peaceful riverside hike along the Beas River, perfect for nature lovers and photography enthusiasts.",
    image: experienceImages[3],
    fullDescription: "Enjoy a peaceful and scenic hike along the beautiful Beas River. This gentle day hike is perfect for nature lovers, families, and photography enthusiasts. Follow the river's course through lush landscapes, spot local wildlife, and enjoy the soothing sounds of flowing water.",
    duration: "1 Day",
    price: "Starting from ₹2,200",
    includes: [
      "Experienced nature guide",
      "Basic equipment",
      "Lunch and refreshments",
      "Transportation",
      "Nature interpretation"
    ],
    highlights: [
      "Riverside scenery",
      "Wildlife spotting opportunities",
      "Easy to moderate difficulty",
      "Family-friendly",
      "Photography paradise"
    ]
  },
  {
    id: "river-rafting-adventure",
    icon: Waves,
    title: "River Rafting & Local Adventure",
    category: "Adventure",
    description: "Thrilling water sports and local adventure activities for adrenaline seekers.",
    image: experienceImages[8],
    fullDescription: "Get your adrenaline pumping with White-water rafting in river bias, Rock Climbing, River Crossing, Rappling, Zippling, Obstacle, Cliff jumping, and other exciting water sports. This adventure package combines thrilling activities with local cultural experiences, making it perfect for adventure enthusiasts looking for both excitement and cultural immersion.",
    duration: "3-4 Days",
    price: "Starting from ₹7,500",
    includes: [
      "All safety equipment and gear",
      "Certified rafting guides",
      "Accommodation",
      "Meals and refreshments",
      "Adventure photography package"
    ],
    highlights: [
      "Grade III-IV rapids",
      "Multiple adventure activities",
      "Professional safety standards",
      "Breathtaking river scenery",
      "Local cultural experiences"
    ]
  },
  
  // ========== SURVIVAL CATEGORY ==========
  {
    id: "military-survival-training",
    icon: Mountain,
    title: "Military Survival Training Camp",
    category: "Survival",
    description: "Intensive survival training program led by ex-Army Officers, designed for those seeking advanced wilderness skills and mental toughness.",
    image: experienceImages[4],
    fullDescription: "Develop elite-level survival skills through rigorous training designed and led by former military personnel. Learn advanced navigation, emergency shelter construction, fire-making in adverse conditions, water sourcing and purification, and mental resilience techniques used by special forces. This comprehensive program prepares you for any survival situation.",
    duration: "3 Nights - 4 Days",
    price: "Starting from ₹20,000",
    includes: [
      "Tactical training equipment",
      "Meals and rations",
      "Certified ex-military instructors",
      "Comprehensive survival manual",
      "Certification upon completion"
    ],
    highlights: [
      "Led by ex-Army Officers",
      "Military-grade survival techniques",
      "Stress inoculation training",
      "Advanced navigation and orienteering",
      "Emergency medical procedures",
      "Leadership and team coordination"
    ]
  },
  
  // ========== HOMESTEADING CATEGORY ==========
  {
    id: "sustainable-farming-workshop",
    icon: TreePine,
    title: "Permaculture & Sustainable Farming Workshops",
    category: "Homesteading",
    description: "Learn sustainable farming techniques and permaculture principles to create self-sustaining ecosystems.",
    image: experienceImages[5],
    fullDescription: "A comprehensive workshop on sustainable agriculture and permaculture design. Learn to create self-sustaining food systems, understand soil health, water management, and integrate permaculture principles into your own farming or gardening practices. Perfect for those interested in sustainable living and food security.",
    duration: "5-7 Days",
    price: "Starting from ₹10,000",
    includes: [
      "Accommodation and meals",
      "Workshop materials and tools",
      "Take-home permaculture design manual",
      "Hands-on practice sessions",
      "Certificate of completion"
    ],
    highlights: [
      "Permaculture design principles",
      "Soil regeneration techniques",
      "Water harvesting and management",
      "Companion planting strategies",
      "Creating food forests",
      "Sustainable living practices"
    ]
  },
   // ========== CHILDREN'S CAMPING CATEGORY ==========
  {
    id: "brave-hearts-kids-camp",
    icon: Baby,
    title: "Brave Heart Kids Camp",
    category: "Children's Camping",
    description: "An empowering camp designed for children ages 8-16 to build confidence, teamwork, and outdoor skills.",
    image: experienceImages[0],
    fullDescription: "Brave Heart Kids Camp is a comprehensive outdoor education program designed to empower children ages 8-16 through adventure and learning. Our carefully structured activities combine wilderness skills, team-building exercises, and environmental education to create a transformative experience for young minds. All activities are age-appropriate and supervised by certified instructors.",
    duration: "3-5 Days",
    price: "Starting from ₹3,500",
    includes: [
      "Accommodation in safe, supervised camp setting",
      "All meals (nutritious and balanced)",
      "Certified instructors and safety equipment",
      "Educational activities and workshops",
      "Transportation from designated pickup points",
      "24/7 supervision and care"
    ],
    highlights: [
      "Age-appropriate outdoor activities (Ages 8-16)",
      "Leadership and confidence building",
      "Nature exploration and environmental awareness",
      "Safe and supervised environment",
      "Skills certification upon completion",
      "Team-building exercises"
    ]
  },
  {
    id: "self-discovery-retreat",
    icon: Sparkles,
    title: "Self-Discovery Retreat",
    category: "Children's Camping",
    description: "A transformative experience for young adults ages 14-22 to explore their potential, build resilience, and discover their inner strength.",
    image: experienceImages[1],
    fullDescription: "The Self-Discovery Retreat is designed for young adults ages 14-22 transitioning to higher education or early career stages. Through meditation, reflective exercises, and outdoor challenges, participants gain clarity about their goals, build emotional resilience, and develop essential life skills for personal and academic success.",
    duration: "5-7 Days",
    price: "Starting from ₹8,500",
    includes: [
      "Lodging in comfortable retreat setting",
      "All meals (vegetarian and non-vegetarian options)",
      "Workshops on goal setting and personal development",
      "Meditation and mindfulness sessions",
      "One-on-one counseling sessions",
      "Outdoor adventure activities"
    ],
    highlights: [
      "Designed for ages 14-22",
      "Personal growth workshops",
      "Leadership development",
      "Stress management techniques",
      "Career guidance sessions",
      "Lifetime network of like-minded peers"
    ]
  },
  // ========== WELLNESS CATEGORY ==========
  {
    id: "curated-wellness-retreat",
    icon: Heart,
    title: "Curated Wellness Retreat",
    category: "Wellness",
    description: "A comprehensive wellness experience featuring yoga, hot baths, sauna, ice baths, and therapeutic massage.",
    image: experienceImages[2],
    fullDescription: "Indulge in a complete wellness experience designed to rejuvenate your body, mind, and spirit. Our curated retreat includes daily yoga sessions, therapeutic hot baths, traditional sauna experiences, invigorating ice baths, and professional massage therapy. This holistic approach to wellness helps you relax, recover, and restore your natural balance.",
    duration: "4-7 Days",
    price: "Starting from ₹12,000",
    includes: [
      "Comfortable wellness accommodations",
      "All meals (healthy, organic options)",
      "Daily yoga and meditation sessions",
      "Hot bath and sauna access",
      "Ice bath therapy sessions",
      "Professional massage therapy",
      "Wellness consultation"
    ],
    highlights: [
      "Daily yoga and meditation",
      "Therapeutic hot baths",
      "Traditional sauna experience",
      "Ice bath therapy",
      "Professional massage sessions",
      "Holistic wellness approach",
      "Organic, healthy meals"
    ]
  },
  {
    id: "farm-detox-retreat",
    icon: TreePine,
    title: "Farm Detox Retreat",
    category: "Wellness",
    description: "Experience sustainable farming practices while detoxifying your body and mind through farm-to-table living.",
    image: experienceImages[3],
    fullDescription: "Reconnect with the earth through hands-on farming experience. Learn permaculture principles, participate in organic farming, and enjoy fresh, chemical-free meals prepared from what you harvest. This retreat combines physical activity, healthy eating, and mindfulness practices for complete wellness.",
    duration: "7-10 Days",
    price: "Starting from ₹15,000",
    includes: [
      "Farm stay accommodations",
      "100% organic, farm-to-table meals",
      "Daily farming activities and workshops",
      "Yoga and meditation sessions",
      "Nature walks and farm tours"
    ],
    highlights: [
      "Learn sustainable farming techniques",
      "Hands-on permaculture training",
      "Chemical-free, organic produce",
      "Physical detox through natural activities",
      "Mindful eating practices"
    ]
  },
  
 
  
  // ========== DIGITAL DETOX / HOMESTAY CATEGORY ==========
  {
    id: "digital-detox-homestay",
    icon: WifiOff,
    title: "Digital Detox / Homestay - Disconnect-to-Reconnect",
    category: "Digital Detox / Homestay",
    description: "Experience a complete digital detox in a homestay setting, reconnecting with yourself, nature, and meaningful human connections.",
    image: experienceImages[6],
    fullDescription: "Step away from the digital world and reconnect with what truly matters. Our Digital Detox Homestay experience offers a peaceful retreat where you can disconnect from technology and reconnect with yourself, nature, and meaningful human connections. Enjoy simple living, authentic local experiences, and the tranquility of being present in the moment.",
    duration: "3-10 Days",
    price: "Starting from ₹4,500",
    includes: [
      "Comfortable homestay accommodations",
      "All home-cooked meals",
      "No Wi-Fi or digital distractions",
      "Nature walks and outdoor activities",
      "Meditation and mindfulness sessions",
      "Local cultural experiences",
      "Reading materials and board games"
    ],
    highlights: [
      "Complete digital detox",
      "Authentic homestay experience",
      "Reconnect with nature",
      "Mindfulness and meditation",
      "Local cultural immersion",
      "Simple, peaceful living",
      "Meaningful human connections"
    ]
  },
  
  // ========== CUSTOM EXPERIENCE ==========
  {
    id: "design-your-own-experience",
    icon: PenTool,
    title: "Curate Your Own Event",
    category: "Custom Experience",
    description: "Design a personalized experience tailored to your group's interests, needs, and preferences.",
    image: experienceImages[9],
    fullDescription: "Create a unique experience that's perfectly tailored to your group. Whether it's a corporate retreat, family gathering, educational program, or special celebration, we'll work with you to design an experience that meets your specific needs, interests, and goals.",
    duration: "Customizable",
    price: "Custom pricing based on requirements",
    includes: [
      "Customized itinerary planning",
      "Flexible accommodation options",
      "Tailored activities and workshops",
      "Meal planning based on preferences",
      "Dedicated coordinator",
      "All necessary equipment and resources"
    ],
    highlights: [
      "Fully customizable experience",
      "Tailored to your group's needs",
      "Flexible duration and activities",
      "Personalized itinerary",
      "Expert guidance and support",
      "Unique and memorable experience"
    ],
    isCustom: true
  },
];

// Helper function to get experience by ID
export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(exp => exp.id === id);
};

// Helper function to get experiences by category
export const getExperiencesByCategory = (category: string): Experience[] => {
  return experiences.filter(exp => exp.category === category);
};

