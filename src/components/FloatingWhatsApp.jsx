import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

const FloatingWhatsApp = () => {
  const phoneNumber = "918265892437";
  const message = "Hello! I would like to know more.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If user is at the very bottom
      if (scrollTop + windowHeight >= documentHeight - 10) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hide) return null;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-[9999]"
      aria-label="Chat on WhatsApp"
    >
     <div
  style={{ backgroundColor: "#22c55e", width: 56, height: 56, borderRadius: 9999 }}
  className="flex items-center justify-center"
>
  <FaWhatsapp className="text-white " />
</div>

    </a>
  );
};

export default FloatingWhatsApp;
