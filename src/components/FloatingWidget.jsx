import React, { useEffect, useState } from "react";
import { Phone, MessageCircle, ChevronUp } from "lucide-react";

const FloatingWidget = () => {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");

      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;

        setShowWidget(window.scrollY > heroHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
        href="tel:+919756368492"
        className="w-40 bg-green-600 text-white py-3 rounded-lg text-center shadow-lg"
      >
        Call Now
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919756368492"
        target="_blank"
        rel="noreferrer"
        className="w-40 bg-sky-500 text-white py-3 rounded-lg text-center shadow-lg"
      >
        Chat With Us
      </a>

    </div>
  );
};

export default FloatingWidget;