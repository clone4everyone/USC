import article1 from "@/assets/article-1.webp";
import article2 from "@/assets/article-2.webp";
import article3 from "@/assets/article-3.webp";
import story1 from "@/assets/story-1.webp";
import story2 from "@/assets/story-2.webp";
import story3 from "@/assets/story-3.webp";
import story4 from "@/assets/story-4.webp";
import storyMain from "@/assets/story-main.webp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { convertGoogleEventToEvent, fetchGoogleCalendarEvents } from "@/utils/googleCalendar";
import { ArrowRight, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Users, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Event {
  id: string;
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  location: string;
  description: string;
  image: string;
  capacity?: string;
  price?: string;
  isMultiDay: boolean;
}

// Default/fallback events with proper date parsing
const defaultEvents: Event[] = [
  // January 2025
    {
      id: "winter-survival-1",
      title: "Winter Survival Intensive",
      category: "Survival",
    startDate: new Date(2025, 0, 15),
    endDate: new Date(2025, 0, 20),
      duration: "5 Days",
      location: "Mountain Base Camp",
      description: "Master winter survival techniques in challenging conditions. Learn snow shelter construction, cold weather fire-making, and winter navigation.",
      image: story3,
      capacity: "12 participants",
    price: "₹18,000",
    isMultiDay: true
    },
    {
      id: "wellness-retreat-1",
      title: "New Year Wellness Retreat",
      category: "Wellness",
    startDate: new Date(2025, 0, 25),
    endDate: new Date(2025, 0, 30),
      duration: "5 Days",
      location: "Retreat Center",
      description: "Start the year with intention. Yoga, meditation, hot baths, and nature immersion for complete rejuvenation.",
      image: story1,
      capacity: "20 participants",
    price: "₹12,000",
    isMultiDay: true
  },
  {
    id: "meditation-day-1",
    title: "Mindfulness Meditation Day",
    category: "Wellness",
    startDate: new Date(2025, 0, 10),
    endDate: new Date(2025, 0, 10),
    duration: "1 Day",
    location: "Meditation Hall",
    description: "A full day of guided meditation, breathing exercises, and mindfulness practices in nature.",
    image: story2,
    capacity: "25 participants",
    price: "₹1,500",
    isMultiDay: false
  },
  // February 2025
    {
      id: "adventure-hike-1",
      title: "Mountain Day Hikes - Kakar Ludi",
      category: "Adventure",
    startDate: new Date(2025, 1, 8),
    endDate: new Date(2025, 1, 8),
      duration: "1 Day",
      location: "Kakar Ludi Trail",
      description: "Scenic day hike to Kakar Ludi with breathtaking mountain views. Perfect for beginners and experienced hikers.",
      image: story2,
      capacity: "15 participants",
    price: "₹2,500",
    isMultiDay: false
    },
    {
      id: "kids-camp-1",
      title: "Brave Heart Kids Camp",
      category: "Children's Camping",
    startDate: new Date(2025, 1, 15),
    endDate: new Date(2025, 1, 18),
      duration: "3 Days",
      location: "Camp Site",
      description: "Empowering camp for children ages 8-16. Build confidence, teamwork, and outdoor skills in a safe environment.",
      image: story4,
      capacity: "30 participants",
    price: "₹3,500",
    isMultiDay: true
  },
  {
    id: "nature-walk-1",
    title: "Guided Nature Walk",
    category: "Adventure",
    startDate: new Date(2025, 1, 22),
    endDate: new Date(2025, 1, 22),
    duration: "1 Day",
    location: "Forest Trail",
    description: "Explore local flora and fauna with expert naturalists. Perfect for nature enthusiasts.",
    image: story3,
    capacity: "20 participants",
    price: "₹1,200",
    isMultiDay: false
  },
  // March 2025
    {
      id: "water-sports-1",
      title: "Water Sports",
      category: "Adventure",
    startDate: new Date(2025, 2, 10),
    endDate: new Date(2025, 2, 12),
      duration: "2-3 Days",
      location: "River Base",
      description: "Thrilling water sports including rafting and kayaking. Experience the rush of white-water adventures.",
      image: article1,
      capacity: "18 participants",
    price: "₹6,500",
    isMultiDay: true
    },
    {
      id: "farming-workshop-1",
      title: "Permaculture & Sustainable Farming",
      category: "Homesteading",
    startDate: new Date(2025, 2, 20),
    endDate: new Date(2025, 2, 25),
      duration: "5 Days",
      location: "Farm Site",
      description: "Learn sustainable farming techniques and permaculture principles. Hands-on workshops and practical training.",
      image: article2,
      capacity: "15 participants",
    price: "₹10,000",
    isMultiDay: true
  },
  // April 2025
    {
      id: "military-survival-1",
      title: "Military Survival Training Camp",
      category: "Survival",
    startDate: new Date(2025, 3, 5),
    endDate: new Date(2025, 3, 15),
      duration: "10 Days",
      location: "Training Grounds",
      description: "Intensive survival training led by ex-Army Officers. Advanced wilderness skills and mental toughness development.",
      image: article3,
      capacity: "10 participants",
    price: "₹25,000",
    isMultiDay: true
    },
    {
      id: "self-discovery-1",
      title: "Self-Discovery Retreat",
      category: "Children's Camping",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 3, 25),
      duration: "5 Days",
      location: "Retreat Center",
      description: "Transformative experience for ages 14-22. Explore potential, build resilience, and discover inner strength.",
      image: story1,
      capacity: "25 participants",
    price: "₹8,500",
    isMultiDay: true
    }
];

// Google Calendar ID - using the decoded calendar ID from the public iCal URL
const GOOGLE_CALENDAR_ID = '163ea83353e9f5cb481f7f948b945bdbf2ec98304940bd22038bb77d3546146b@group.calendar.google.com';
// const GOOGLE_CALENDAR_ID = 'classroom1234567890@group.calendar.google.com';

const Events = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [scrollY, setScrollY] = useState(0);
  const [googleEvents, setGoogleEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Function to load Google Calendar events (optimized - starts immediately)
  const loadGoogleCalendarEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    
    try {
      const googleCalEvents = await fetchGoogleCalendarEvents(GOOGLE_CALENDAR_ID);
      
      // Convert Google Calendar events to our Event format
      const convertedEvents = googleCalEvents.map((event, index) => {
        // Use different default images based on category
        const defaultImages = [story1, story2, story3, story4, article1, article2, article3];
        const defaultImage = defaultImages[index % defaultImages.length];
        
        return convertGoogleEventToEvent(event, index, defaultImage);
      });
      
      setGoogleEvents(convertedEvents);
    } catch (error) {
      console.error('Failed to load Google Calendar events:', error);
      setGoogleEvents([]);
    } finally {
      setIsLoadingEvents(false);
    }
  }, []);
  
  // Fetch events from Google Calendar immediately on mount (optimized)
  useEffect(() => {
    // Start loading immediately, don't wait
    loadGoogleCalendarEvents();
  }, [loadGoogleCalendarEvents]);
  
  // Use only Google Calendar events (no default events)
  const allEvents = useMemo(() => {
    return [...googleEvents].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [googleEvents]);

  // Get events for selected date
  const eventsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return allEvents.filter(event => {
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      const eventStart = new Date(event.startDate);
      eventStart.setHours(0, 0, 0, 0);
      const eventEnd = new Date(event.endDate);
      eventEnd.setHours(0, 0, 0, 0);
      
      return selected >= eventStart && selected <= eventEnd;
    });
  }, [selectedDate, allEvents]);

  // Get upcoming events (events that start after today)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return allEvents
      .filter(event => {
        const eventStart = new Date(event.startDate);
        eventStart.setHours(0, 0, 0, 0);
        return eventStart > today;
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, 10); // Show next 10 upcoming events
  }, [allEvents]);

  // Get all event dates for calendar highlighting
  const eventDates = useMemo(() => {
    const dates: Date[] = [];
    allEvents.forEach(event => {
      const start = new Date(event.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(event.endDate);
      end.setHours(0, 0, 0, 0);
      const current = new Date(start);
      
      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, [allEvents]);

  // Custom day modifier for calendar - show both one-day and multi-day events
  const modifiers = useMemo(() => ({
    hasEvent: (date: Date) => {
      const dateStr = date.toDateString();
      return eventDates.some(d => d.toDateString() === dateStr);
    },
    singleDayEvent: (date: Date) => {
      const dateStr = date.toDateString();
      return allEvents.some(e => {
        const eventStart = new Date(e.startDate);
        eventStart.setHours(0, 0, 0, 0);
        return !e.isMultiDay && eventStart.toDateString() === dateStr;
      });
    },
    multiDayEvent: (date: Date) => {
      const dateStr = date.toDateString();
      return allEvents.some(e => {
        if (!e.isMultiDay) return false;
        const eventStart = new Date(e.startDate);
        eventStart.setHours(0, 0, 0, 0);
        const eventEnd = new Date(e.endDate);
        eventEnd.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate >= eventStart && checkDate <= eventEnd;
      });
    },
    eventStart: (date: Date) => {
      const dateStr = date.toDateString();
      return allEvents.some(e => {
        const eventStart = new Date(e.startDate);
        eventStart.setHours(0, 0, 0, 0);
        return eventStart.toDateString() === dateStr;
      });
    },
    eventEnd: (date: Date) => {
      const dateStr = date.toDateString();
      return allEvents.some(e => {
        const eventEnd = new Date(e.endDate);
        eventEnd.setHours(0, 0, 0, 0);
        return eventEnd.toDateString() === dateStr;
      });
    }
  }), [allEvents, eventDates]);

  const modifiersClassNames = {
    hasEvent: "relative",
    // One-day events: circular badge with border (applied first, then multi-day can override)
    singleDayEvent: "bg-primary/40 border-2 border-primary rounded-full font-semibold text-primary z-10",
    // Multi-day events: background color (applied to all days in range)
    multiDayEvent: "bg-accent/50",
    // Start of multi-day event: rounded left corner
    eventStart: "rounded-l-full bg-accent/60",
    // End of multi-day event: rounded right corner
    eventEnd: "rounded-r-full bg-accent/60"
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };



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
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove("opacity-0", "translate-y-8");
          el.classList.add("opacity-100", "translate-y-0");
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-3 px-3 pb-12">
        <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl">
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
            <img
              src={storyMain}
              alt="Events Background"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/85 via-earth-dark/80 to-forest-medium/75" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-24">
            <div className="max-w-5xl mx-auto text-center">
              <div className="animate-fade-in-up mb-4 sm:mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 md:mb-8 border border-primary-foreground/30">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary-foreground">Upcoming Events & Camps</span>
                </div>
              </div>
              
              <div className="animate-fade-in-up mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
                  Event <span className="text-primary">Calendar</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                  Explore our interactive calendar to find the perfect event for you. Click on any date to see available camps and retreats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big Interactive Calendar Section */}
      <section className="py-12 md:py-16 lg:py-24 relative z-10 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={addToRefs} className="opacity-0 translate-y-8 text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
              <Sparkles className="text-primary" size={18} />
              <span className="text-sm font-semibold text-primary">Interactive Calendar</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2">
              Choose Your <span className="text-primary">Dates</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Click on any highlighted date to view events. One-day events have a border, week-long events span multiple days.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Large Calendar - Takes 2 columns */}
              <div className="lg:col-span-2">
                <div ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
                  <div className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-10 border border-border shadow-2xl overflow-hidden">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
                      <button
                        onClick={() => handleMonthChange('prev')}
                        className="p-2 md:p-3 rounded-full hover:bg-secondary transition-colors flex-shrink-0"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                      </button>
                      <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-center px-2">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => handleMonthChange('next')}
                        className="p-2 md:p-3 rounded-full hover:bg-secondary transition-colors flex-shrink-0"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                      </button>
                </div>

                    {/* Interactive Calendar */}
                    <div className="flex justify-center overflow-x-auto pb-4 md:pb-8">
                      <div className="w-full min-w-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          month={currentMonth}
                          onMonthChange={setCurrentMonth}
                          modifiers={modifiers}
                          modifiersClassNames={modifiersClassNames}
                          className="w-full"
                          classNames={{
                            months: "flex flex-col space-y-3 md:space-y-4 lg:space-y-6",
                            month: "space-y-2 md:space-y-4 lg:space-y-6 w-full",
                            caption: "hidden",
                            caption_label: "hidden",
                            nav: "hidden",
                            nav_button: "hidden",
                            nav_button_previous: "hidden",
                            nav_button_next: "hidden",
                            table: "w-full border-collapse space-y-1 md:space-y-2 mx-auto",
                            head_row: "flex justify-center",
                            head_cell: "text-muted-foreground rounded-md w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 font-normal text-xs md:text-sm lg:text-base text-center flex items-center justify-center",
                            row: "flex w-full mt-1 md:mt-2 lg:mt-3 justify-center",
                            cell: "h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 text-center text-xs md:text-sm lg:text-base p-0 relative flex items-center justify-center",
                            day: "h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 p-0 font-normal text-xs md:text-sm lg:text-base aria-selected:opacity-100 hover:bg-secondary rounded-lg transition-all flex items-center justify-center",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today: "bg-accent text-accent-foreground font-bold",
                          }}
                        />
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-4 md:mt-8 lg:mt-12 pt-4 md:pt-6 lg:pt-8 border-t border-border">
                      <p className="text-sm md:text-base font-semibold mb-3 md:mb-4 lg:mb-6 text-center">Legend:</p>
                      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full border-2 border-primary bg-primary/20 flex-shrink-0" />
                          <span>One-Day Event</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded bg-accent/30 flex-shrink-0" />
                          <span>Multi-Day Event</span>
                        </div>
                      </div>
                    </div>
                          </div>
                        </div>
                      </div>

              {/* Events Panel - Takes 1 column */}
              <div className="lg:col-span-1">
                <div ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700" style={{ animationDelay: "0.2s" }}>
                  <div className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 border border-border shadow-2xl lg:sticky lg:top-24">
                    <h3 className="text-2xl font-bold mb-6">
                      {selectedDate 
                        ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : 'Select a date'
                      }
                    </h3>

                    {eventsOnSelectedDate.length > 0 ? (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto">
                        {eventsOnSelectedDate.map((event) => (
                          <div
                            key={event.id}
                            className="p-4 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer bg-secondary/30 hover:bg-secondary/50 group"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{event.title}</h4>
                              {event.isMultiDay ? (
                                <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full whitespace-nowrap">Week-Long</span>
                              ) : (
                                <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full whitespace-nowrap">One-Day</span>
                              )}
                          </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 whitespace-pre-line">{event.description}</p>
                            <div className="space-y-1.5 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{event.duration}</span>
                          </div>
                              <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                                <span className="truncate">{event.location}</span>
                            </div>
                        </div>
                          {event.price && (
                              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                <span className="font-bold text-primary">{event.price}</span>
                          <Button
                            size="sm"
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                  }}
                                >
                                  Details
                                  <ArrowRight className="ml-1 w-3 h-3" />
                          </Button>
                        </div>
                            )}
                    </div>
                  ))}
                </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No events scheduled for this date.</p>
                        <p className="text-sm mt-2">Select a highlighted date to view events.</p>
                      </div>
                    )}

                    {/* Upcoming Events Section */}
                    {upcomingEvents.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-border">
                        <h3 className="text-lg font-bold mb-4 text-foreground">Upcoming Events</h3>
                        <div className="space-y-3">
                          {upcomingEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer bg-secondary/30 hover:bg-secondary/50 group"
                              onClick={() => {
                                setSelectedDate(event.startDate);
                                setSelectedEvent(event);
                              }}
                            >
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors mb-1 line-clamp-1">
                                {event.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {event.startDate.toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                                {event.startDate.getTime() !== event.endDate.getTime() && 
                                  ` - ${event.endDate.toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}`
                                }
                              </p>
              </div>
            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-card rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

                <div className="relative h-[300px] overflow-hidden">
                  <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
                  />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex gap-2 mb-3">
                  <div className="bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50">
                    <span className="text-xs font-semibold text-foreground uppercase">{selectedEvent.category}</span>
                  </div>
                  {selectedEvent.isMultiDay ? (
                    <div className="bg-accent/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent/50">
                      <span className="text-xs font-semibold text-accent-foreground">Week-Long Event</span>
                    </div>
                  ) : (
                    <div className="bg-primary/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/50">
                      <span className="text-xs font-semibold text-primary-foreground">One-Day Event</span>
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{selectedEvent.title}</h2>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selectedEvent.description}</p>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">
                      {selectedEvent.startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      {selectedEvent.isMultiDay && ` - ${selectedEvent.endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{selectedEvent.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{selectedEvent.location}</p>
                  </div>
                    </div>
                {selectedEvent.capacity && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-semibold">{selectedEvent.capacity}</p>
                  </div>
                </div>
                )}
              </div>

              {selectedEvent.price && (
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-3xl font-bold text-primary">{selectedEvent.price}</p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                  >
                    Book Your Slot
                    <ArrowRight className="ml-2" />
                  </Button>
                </div>
              )}
              </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section id="calendar-section" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div ref={addToRefs} className="opacity-0 translate-y-8 max-w-4xl mx-auto text-center transition-all duration-700">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 md:p-16 border border-primary/20 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
                <CalendarIcon className="text-primary" size={18} />
                <span className="text-sm font-semibold text-primary">Reserve Your Spot</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="text-primary">Join Us</span>?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Don't miss out on these transformative experiences. Book your slot today and embark on a journey 
                that will change how you see the world.
              </p>
              
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                onClick={() => {
                  document.getElementById("calendar-section")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book Your Slot
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
