import React from "react";

const Alliance = ({ image, title }) => {
  return (
    <div className="overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-auto object-contain bg-white"
      />

      {title && (
        <div className="p-2 text-center text-sm sm:text-base font-medium">
          {title}
        </div>
      )}

    </div>
  );
};

export default Alliance;