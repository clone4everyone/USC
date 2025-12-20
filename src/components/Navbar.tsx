import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Helper function to scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant" as ScrollBehavior,
  });
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Activities", href: "/activities" },
    { name: "Stay", href: "/stay" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 pt-3 ${
        isScrolled ? "pb-3" : "pb-0"
      }`}
    >
      <div 
        className={`mx-auto px-6 py-4 rounded-3xl transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2 group min-w-0 flex-1 md:flex-none">
            <div className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight transition-colors truncate ${
              isScrolled 
                ? "text-foreground group-hover:text-primary" 
                : "text-white group-hover:text-primary"
            }`}>
              Ultimate Survival Campsite
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={scrollToTop}
                  className={`text-sm font-medium transition-colors relative group ${
                    isScrolled 
                      ? "text-foreground/80 hover:text-primary" 
                      : "text-white/90 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isScrolled 
                      ? "text-foreground/80 hover:text-primary" 
                      : "text-white/90 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/activities/design-your-own-experience" onClick={scrollToTop}>
              <Button
                className={`transition-all font-semibold shadow-lg hover:shadow-xl ${
                  isScrolled 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "bg-white hover:bg-white/90 text-primary"
                }`}
              >
                Book Campsite
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 animate-fade-in bg-background rounded-2xl p-4 border border-border/50 shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="hover:text-primary transition-colors py-2 text-foreground"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToTop();
                    }}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-primary transition-colors py-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <Link 
                to="/activities/design-your-own-experience"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToTop();
                }}
              >
                <Button 
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl w-full"
                >
                  Book Campsite
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
