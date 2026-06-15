import React, { useState } from "react";

const Gallery = ({ images, IMAGE_URL }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return `${IMAGE_URL}${img}`;
    return `${IMAGE_URL}/uploads/${img}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="mb-10 text-center text-3xl md:text-4xl font-bold">
        Photo Gallery
      </h2>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {images?.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedImage(item.image)}
            className="group relative overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={item.image}
              alt="Andaman Islands Travel Gallery"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
              className="h-24 sm:h-32 md:h-48 lg:h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />

            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
              <h3 className="text-lg font-semibold text-center">
                CLICK TO VIEW FULL IMAGE
              </h3>
            </div>
          </div>
        ))}
      </div>

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
            alt="Andaman Travel Destination Full View"
            decoding="async"
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
