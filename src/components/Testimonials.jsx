import { useEffect, useState } from "react";
import API from "@/api/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonial");

      console.log("Testimonials:", res.data);

      setTestimonials(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Our Testimonials
      </h2>

      {testimonials.length === 0 ? (
        <p className="text-center text-gray-500">No Testimonials Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="aspect-video overflow-hidden  shadow-lg"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${item.video}`}
                title={`Customer Testimonial ${item._id}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
