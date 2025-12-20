import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { experiences } from "@/data/experiences";
import { Send, Check } from "lucide-react";

interface BookingData {
  days: string;
  persons: string;
  selectedTypes: string[];
  selectedActivities: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
}

const CustomEventBookingForm = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    days: "",
    persons: "",
    selectedTypes: [],
    selectedActivities: [],
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const toggleType = (value: string) => {
    setBookingData((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(value)
        ? prev.selectedTypes.filter((t) => t !== value)
        : [...prev.selectedTypes, value],
    }));
  };

  const toggleActivity = (activityId: string) => {
    setBookingData((prev) => ({
      ...prev,
      selectedActivities: prev.selectedActivities.includes(activityId)
        ? prev.selectedActivities.filter((id) => id !== activityId)
        : [...prev.selectedActivities, activityId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get selected activities details
    const selectedActivitiesDetails = bookingData.selectedActivities
      .map((activityId) => experiences.find((exp) => exp.id === activityId))
      .filter((exp) => exp !== undefined);

    // Build WhatsApp message
    const phoneNumber = "918265892437";
    let message = `Hello! I'm interested in booking a custom event.\n\n`;

    message += `*Contact Information:*\n`;
    message += `Name: ${bookingData.name}\n`;
    message += `Email: ${bookingData.email}\n`;
    message += `Phone: ${bookingData.phone}\n\n`;

    message += `*Event Details:*\n`;
    message += `Duration: ${bookingData.days} day${bookingData.days !== "1" ? "s" : ""}\n`;
    message += `Number of Persons: ${bookingData.persons}\n`;

    if (bookingData.selectedTypes.length > 0) {
      message += `Group Types: ${bookingData.selectedTypes.join(", ")}\n`;
    }

    if (selectedActivitiesDetails.length > 0) {
      message += `\n*Selected Activities:*\n`;
      selectedActivitiesDetails.forEach((activity, index) => {
        if (activity) {
          message += `${index + 1}. *${activity.title}*\n`;
          message += `   Category: ${activity.category}\n`;
          if (activity.duration) message += `   Duration: ${activity.duration}\n`;
          if (activity.price) message += `   Price: ${activity.price}\n`;
          message += `   ${activity.description}\n\n`;
        }
      });
    }

    if (bookingData.message) {
      message += `*Additional Message:*\n${bookingData.message}\n\n`;
    }

    message += `Please let me know about availability and booking details. Thank you!`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const groupTypes = [
    { value: "school", label: "School / Educational" },
    { value: "corporate", label: "Corporate" },
    { value: "private", label: "Private Group" },
    { value: "family", label: "Family" },
    { value: "friends", label: "Friends" },
    { value: "other", label: "Other" },
  ];

  const availableActivities = experiences.filter(
    (exp) => exp.id !== "design-your-own-experience"
  );

  return (
    <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Book Your Custom Event</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={bookingData.name}
              onChange={(e) =>
                setBookingData({ ...bookingData, name: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={bookingData.email}
              onChange={(e) =>
                setBookingData({ ...bookingData, email: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 1234567890"
            value={bookingData.phone}
            onChange={(e) =>
              setBookingData({ ...bookingData, phone: e.target.value })
            }
            required
            className="bg-background"
          />
        </div>

        {/* Days and Persons */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="days">Number of Days *</Label>
            <Input
              id="days"
              type="number"
              min="1"
              placeholder="e.g., 3"
              value={bookingData.days}
              onChange={(e) =>
                setBookingData({ ...bookingData, days: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="persons">Number of Persons *</Label>
            <Input
              id="persons"
              type="number"
              min="1"
              placeholder="e.g., 10"
              value={bookingData.persons}
              onChange={(e) =>
                setBookingData({ ...bookingData, persons: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
        </div>

        {/* Group Types */}
        <div className="space-y-3">
          <Label>Group Type (Select multiple) *</Label>
          <div className="grid md:grid-cols-3 gap-3">
            {groupTypes.map((type) => {
              const isSelected = bookingData.selectedTypes.includes(type.value);
              return (
                <div
                  key={type.value}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleType(type.value)}
                >
                  <div
                    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <Label className="cursor-pointer font-normal">
                    {type.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Select Activities */}
        <div className="space-y-3">
          <Label>Select Activities (Choose multiple)</Label>
          <div className="bg-secondary/30 rounded-lg p-4 max-h-[300px] overflow-y-auto border border-border">
            <div className="grid md:grid-cols-2 gap-3">
              {availableActivities.map((activity) => {
                const Icon = activity.icon;
                const isSelected = bookingData.selectedActivities.includes(
                  activity.id
                );
                return (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    <div className="mt-0.5">
                      <div
                        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <h4 className="font-semibold text-sm text-foreground line-clamp-1">
                          {activity.title}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {bookingData.selectedActivities.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {bookingData.selectedActivities.length} activity
              {bookingData.selectedActivities.length !== 1 ? "ies" : "y"}{" "}
              selected
            </p>
          )}
        </div>

        {/* Additional Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Additional Message (Optional)</Label>
          <textarea
            id="message"
            placeholder="Tell us about your group, goals, special requirements, preferred dates, or any other details..."
            value={bookingData.message}
            onChange={(e) =>
              setBookingData({ ...bookingData, message: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
          disabled={
            !bookingData.name ||
            !bookingData.email ||
            !bookingData.phone ||
            !bookingData.days ||
            !bookingData.persons ||
            bookingData.selectedTypes.length === 0
          }
        >
          Book via WhatsApp
          <Send className="ml-2 w-4 h-4" />
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Clicking this button will open WhatsApp with your booking details
        </p>
      </form>
    </div>
  );
};

export default CustomEventBookingForm;

