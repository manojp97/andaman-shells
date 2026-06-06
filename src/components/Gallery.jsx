import React, { useState } from "react";

const images = [
  "/g1.jpg",
  "/g2.jpg",
  "/g3.jpg",
  "/g4.jpg",
  "/g5.jpg",
  "/g6.jpg",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="mb-10 text-center text-3xl md:text-4xl font-bold">
        Photo Gallery
      </h2>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            className="group relative overflow-hidden shadow-lg cursor-pointer "
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="h-24 sm:h-32 md:h-48 lg:h-72  w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
              <h3 className="text-lg font-semibold text-center">
                CLICK TO VIEW FULL IMAGE
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white text-4xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Full View"
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;