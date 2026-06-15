import React from "react";
import { Button } from "./ui/button";

const PackageCards = ({ image, title }) => {
  return (
    <div>
      <div className="overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
        <a
          href="https://wa.me/919599227385"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <Button className="rounded border bg-green-500 hover:bg-green-600 text-white p-5">
            WhatsApp
          </Button>
        </a>

        <a
          href="tel:+919599227385"
          aria-label="Call us for tour package enquiry"
        >
          <Button className="rounded border bg-sky-400 hover:bg-sky-500 text-white p-5">
            Get Callback
          </Button>
        </a>

        <a href="#contact" aria-label="Go to contact enquiry form">
          <Button className="rounded border bg-red-600 hover:bg-red-700 text-white p-5">
            Enquire
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PackageCards;
