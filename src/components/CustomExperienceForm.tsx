import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

interface CustomExperienceFormData {
  name: string;
  contact: string;
  groupType: string;
  numberOfDays: string;
  areaOfInterest: string;
  additionalDetails?: string;
}

const CustomExperienceForm = () => {
  const [formData, setFormData] = useState<CustomExperienceFormData>({
    name: "",
    contact: "",
    groupType: "",
    numberOfDays: "",
    areaOfInterest: "",
    additionalDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof CustomExperienceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          contact: "",
          groupType: "",
          numberOfDays: "",
          areaOfInterest: "",
          additionalDetails: "",
        });
      }, 3000);
    }, 1500);

    // TODO: Replace with actual API call
    // await submitCustomExperience(formData);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl p-8 border border-border shadow-lg text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We've received your request. Our team will contact you within 24-48 hours to discuss your custom experience.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Design Your Own Experience</h3>
        <p className="text-muted-foreground">
          Fill out the form below and our team will work with you to create a personalized experience tailored to your needs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <Label htmlFor="contact">Contact *</Label>
            <Input
              id="contact"
              type="text"
              placeholder="Phone or Email"
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Group Type */}
          <div className="space-y-2">
            <Label htmlFor="groupType">Group Type *</Label>
            <Select
              value={formData.groupType}
              onValueChange={(value) => handleChange("groupType", value)}
              required
            >
              <SelectTrigger id="groupType">
                <SelectValue placeholder="Select group type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="school">School/Educational</SelectItem>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="solo">Solo Traveler</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Days */}
          <div className="space-y-2">
            <Label htmlFor="numberOfDays">Number of Days *</Label>
            <Select
              value={formData.numberOfDays}
              onValueChange={(value) => handleChange("numberOfDays", value)}
              required
            >
              <SelectTrigger id="numberOfDays">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Day</SelectItem>
                <SelectItem value="2-3">2-3 Days</SelectItem>
                <SelectItem value="4-5">4-5 Days</SelectItem>
                <SelectItem value="6-7">6-7 Days</SelectItem>
                <SelectItem value="8-10">8-10 Days</SelectItem>
                <SelectItem value="10+">10+ Days</SelectItem>
                <SelectItem value="custom">Custom Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Area of Interest */}
        <div className="space-y-2">
          <Label htmlFor="areaOfInterest">Area of Interest *</Label>
          <Select
            value={formData.areaOfInterest}
            onValueChange={(value) => handleChange("areaOfInterest", value)}
            required
          >
            <SelectTrigger id="areaOfInterest">
              <SelectValue placeholder="Select area of interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure & Outdoor Activities</SelectItem>
              <SelectItem value="wellness">Wellness & Relaxation</SelectItem>
              <SelectItem value="survival">Survival & Bushcraft</SelectItem>
              <SelectItem value="homesteading">Homesteading & Farming</SelectItem>
              <SelectItem value="team-building">Team Building & Corporate</SelectItem>
              <SelectItem value="education">Educational & Learning</SelectItem>
              <SelectItem value="spiritual">Spiritual & Meditation</SelectItem>
              <SelectItem value="photography">Photography & Nature</SelectItem>
              <SelectItem value="mixed">Mixed Activities</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Details */}
        <div className="space-y-2">
          <Label htmlFor="additionalDetails">Additional Details</Label>
          <Textarea
            id="additionalDetails"
            placeholder="Tell us more about your group, special requirements, preferred dates, or any other details..."
            value={formData.additionalDetails}
            onChange={(e) => handleChange("additionalDetails", e.target.value)}
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Submitting...</span>
            </>
          ) : (
            <>
              Submit Request
              <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CustomExperienceForm;



