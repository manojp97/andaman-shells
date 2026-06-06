import React from "react";

const videos = ["AAHuXZ7qwEU", "V1IJpI4F_qA", "4Z9w-HqBdfA"];

const Testimonials = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Our Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {videos.map((videoId, index) => (
          <div
            key={index}
            className="w-full aspect-video  overflow-hidden shadow-lg"
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`Testimonial ${index + 1}`}
              allowFullScreen
            />
          </div>
        ))}

      </div>

    </section>
  );
};

export default Testimonials;