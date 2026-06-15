import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navbar */}
        <div className="flex h-16 items-center sm:ml-18 justify-between">
          {/* Logo */}
          <img
            src="/logo1.png"
            alt="Andaman Shells Tours and Travels Logo"
            className="h-12 md:h-14 w-auto rounded-full bg-black shrink-0"
            loading="eager"
          />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-5 text-white text-sm font-medium">
            <div className="flex items-center gap-5">
              <a href="/" className="hover:text-sky-400 transition">
                Home
              </a>
              <a href="#alliance" className="hover:text-sky-400 transition">
                Our Alliance
              </a>
              <a href="#packages" aria-label="View our travel packages" className="hover:text-sky-400 transition">
                Our Packages
              </a>
              <a href="#whybook" className="hover:text-sky-400 transition">
                Why Book with Us
              </a>
              <a href="#testimonials" className="hover:text-sky-400 transition">
                Testimonials
              </a>
              <a href="#gallery" className="hover:text-sky-400 transition">
                Photo Gallery
              </a>
              <a href="#faq" className="hover:text-sky-400 transition">
                FAQ
              </a>
              <a href="#enquiry-form" className="hover:text-sky-400 transition">
                Contact Us
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white rounded-lg shadow-lg mt-2 py-3">
            <div className="flex flex-col">
              <a
                href="/"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>

              <a
                href="#alliance"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Our Alliance
              </a>

              <a
                href="#packages"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Our Packages
              </a>

              <a
                href="#whybook"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Why Book with Us
              </a>

              <a
                href="#testimonials"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>

              <a
                href="#gallery"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Photo Gallery
              </a>

              <a
                href="#faq"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>

              <a
                href="#contact"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
