import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchGoogleCalendarEvents, convertGoogleEventToEvent } from "@/utils/googleCalendar";
import { Link } from "react-router-dom";
import story1 from "@/assets/story-1.webp";
import story2 from "@/assets/story-2.webp";
import story3 from "@/assets/story-3.webp";
import story4 from "@/assets/story-4.webp";
import article1 from "@/assets/article-1.webp";
import article2 from "@/assets/article-2.webp";
import article3 from "@/assets/article-3.webp";

const GOOGLE_CALENDAR_ID = 'classroom115807423677492622322@group.calendar.google.com';

const HeroSection = () => {
  const [nextEvent, setNextEvent] = useState<{
    title: string;
    startDate: Date;
    endDate: Date;
    duration: string;
    location: string;
    description: string;
  } | null>(null);
  // Fetch next upcoming event from Google Calendar
  useEffect(() => {
    const loadNextEvent = async () => {
      try {
        const googleCalEvents = await fetchGoogleCalendarEvents(GOOGLE_CALENDAR_ID);
        
        if (googleCalEvents.length > 0) {
          // Convert and find the next upcoming event
          const now = new Date();
          const convertedEvents = googleCalEvents.map((event, index) => {
            const defaultImages = [story1, story2, story3, story4, article1, article2, article3];
            const defaultImage = defaultImages[index % defaultImages.length];
            return convertGoogleEventToEvent(event, index, defaultImage);
          });
          
          // Find the next event (start date is in the future)
          const upcomingEvents = convertedEvents.filter(event => {
            const eventStart = new Date(event.startDate);
            eventStart.setHours(0, 0, 0, 0);
            const today = new Date(now);
            today.setHours(0, 0, 0, 0);
            return eventStart >= today;
          });
          
          if (upcomingEvents.length > 0) {
            // Sort by start date and get the first one
            const next = upcomingEvents.sort((a, b) => 
              a.startDate.getTime() - b.startDate.getTime()
            )[0];
            
            setNextEvent({
              title: next.title,
              startDate: next.startDate,
              endDate: next.endDate,
              duration: next.duration,
              location: next.location,
              description: next.description,
            });
          }
        }
      } catch (error) {
        // Silently handle errors - page will work without calendar data
        // No need to log as it's expected that calendar fetch may fail
      }
    };
    
    loadNextEvent();
  }, []);

  // YouTube video embed URL with autoplay, loop, no controls, and muted
  // Using enhanced parameters to hide all YouTube UI elements
  const youtubeVideoId = "FRwywcxNkEI";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=0&mute=1&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&start=0`;

  return (
    <section id="home" className="pt-3 px-3 pb-12">
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
          {/* YouTube iframe container with cover effect */}
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={youtubeEmbedUrl}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "100vw",
                height: "56.25vw", // 16:9 aspect ratio
                minHeight: "100vh",
                minWidth: "177.77777778vh", // 16:9 aspect ratio
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                border: "none",
                zIndex: 0,
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              title="Hero Background Video"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/90 via-earth-dark/85 to-forest-medium/80 z-10" />
        </div>

        {/* Content */}
        <div className="container relative z-20 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
          <div className="max-w-4xl">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
              Ultimate Survival Campsite: Nature’s classroom . Your turning point
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
             Reconnect with the outdoors through hands-on adventure activities, kids camping, mindful retreats, and experiences that helps you become a better version.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full sm:w-auto"
            >
              Start Your Journey
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground !text-primary-foreground hover:bg-primary-foreground hover:!text-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full transition-all bg-background/20 backdrop-blur-sm w-full sm:w-auto"
              onClick={() => {
                const videoSection = document.getElementById('video-section');
                if (videoSection) {
                  videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <Play className="mr-2" size={20} />
              Watch Video
            </Button>
          </div>
          </div>

          {/* Floating Info Card */}
          <div className="absolute bottom-12 right-12 hidden lg:block animate-slide-in-right z-20">
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-strong max-w-sm">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground mb-2">
                  Next Campsite Session Starts Soon
                </h3>
                {nextEvent ? (
                  <>
                    <h4 className="font-bold text-card-foreground mb-2 line-clamp-1">
                      {nextEvent.title}
                    </h4>
                    <div className="space-y-1.5 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3 h-3 flex-shrink-0" />
                        <span>
                          {nextEvent.startDate.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                          {nextEvent.startDate.getTime() !== nextEvent.endDate.getTime() && 
                            ` - ${nextEvent.endDate.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}`
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{nextEvent.duration}</span>
                      </div>
                      {nextEvent.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{nextEvent.location}</span>
                        </div>
                      )}
                    </div>
                    <Link to="/events">
                      <Button size="sm" variant="link" className="p-0 h-auto text-primary">
                        View Details →
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join our wilderness survival intensive
                    </p>
                    <Link to="/events">
                      <Button size="sm" variant="link" className="p-0 h-auto text-primary">
                        Learn more →
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-20">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
