import React from "react";
import { Button } from "./ui/button";

const PackageCards = ({ image, title }) => {
  return (
    <div>

    <div className="overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-300">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>

    <div className="flex items-center justify-center gap-3 mt-4">
        <Button className="rounded border bg-green-500 hover:bg-green-600 text-white p-5">Whatsapp</Button>
        <Button className="rounded border bg-sky-400 hover:bg-sky-500 text-white p-5">Get Callback</Button>
        <Button className="rounded border bg-red-600 hover:bg-red-700 text-white p-5">Enquire</Button>
    </div>

    </div>
   

  );
};

export default PackageCards;
