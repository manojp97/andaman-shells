import React from "react";
import { Card } from "./ui/card";

const Cards = () => {
  // Main
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <Card className="overflow-hidden  border-none ">
        <img
          src="/Picture1.jpg"
          alt="Andaman Islands Travel Information"
          loading="lazy"
          decoding="async"
          width="1200"
          height="600"
          className="w-full h-auto object-cover"
        />
      </Card>
    </div>
  );
};

export default Cards;
