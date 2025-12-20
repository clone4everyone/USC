import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HostEventSection from "@/components/HostEventSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import Navbar from "@/components/Navbar";
import StoriesSection from "@/components/StoriesSection";
import TeamSection from "@/components/TeamSection";
import VideoSection from "@/components/VideoSection";
import VisitSection from "@/components/VisitSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection />
        <StoriesSection />
        <MissionVisionSection />
        <ExperienceSection />
        <HostEventSection />
        <VisitSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
