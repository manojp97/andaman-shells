import React from "react";

const Form = () => {
  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Google Map */}
        <div className="w-full h-87.5 lg:h-125 overflow-hidden  shadow">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Sri%20Vijaya%20Puram%20Andaman%20and%20Nicobar%20India&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Right Side - Form */}
        <div className="w-full bg-white  shadow p-4">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

          <form
            className="space-y-6"
            action="https://formsubmit.co/manojsingh1420809@gmail.com"
            method="POST"
          >
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-3 rounded font-semibold hover:bg-sky-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
