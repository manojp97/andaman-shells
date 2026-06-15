import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
const FloatingWidget = () => {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");

      if (heroSection) {
        setShowWidget(window.scrollY > heroSection.offsetHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showWidget) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2">
      {/* Arrow */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
      >
        <ChevronUp size={22} />
      </button>

      {/* Offer */}
      <div className="bg-red-600 text-white text-center px-4 py-2 rounded-lg font-bold shadow-lg">
        Get upto
        <br />
        <span className="text-xl">25% Off</span>
      </div>

      {/* Call */}
      <a
        href="tel:+919599227385"
        aria-label="Call Andaman Shells"
        title="Call Now"
        className="w-40 bg-green-600 text-white py-3 rounded-lg text-center shadow-lg"
      >
        Call Now
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919599227385"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat With Us"
        className="w-40 bg-sky-500 text-white py-3 rounded-lg text-center shadow-lg"
      >
        Chat With Us
      </a>
    </div>
  );
};

export default FloatingWidget;
