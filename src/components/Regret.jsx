import React from "react";
import { useState, useEffect } from "react";
import API from "@/api/api";

const Regret = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await API.get("/contact-info");
      setContactInfo(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="mb-6 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
        Don't Regret Later ‐ Pay Smart Today!
      </h2>

      <h2 className="mb-6 text-center text-lg sm:text-xl md:text-2xl">
        Why pay more and get less?
      </h2>

      <p className="mb-10 text-center text-base sm:text-lg md:text-xl">
        Compare now and get a free quote with no hidden charges or obligations
      </p>

      {/* Contact Section */}
      <div className="py-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
          {/* Phone */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/mobile.svg"
              alt="Phone Contact"
              loading="lazy"
              width="40"
              height="40"
              className="w-10 h-10 mb-3"
            />
            <a
              href={`tel:${contactInfo?.phone}`}
              className="text-base sm:text-lg hover:text-sky-500"
            >
              Call: {contactInfo?.phone}
            </a>
            <p className="text-sm sm:text-base">Monday-Saturday (9am-7pm)</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/mail.svg"
              alt="Email Contact"
              loading="lazy"
              width="40"
              height="40"
              className="w-10 h-10 mb-3"
            />

            <a
              href={`mailto:${contactInfo?.email}`}
              className="text-base sm:text-lg hover:text-sky-500"
            >
              Email: {contactInfo?.email}
            </a>
            <p className="text-sm sm:text-base">Web: {contactInfo?.website}</p>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/location.svg"
              alt="Office Location"
              loading="lazy"
              width="40"
              height="40"
              className="w-10 h-10 mb-3"
            />
            <a
              href={contactInfo?.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center hover:text-sky-500"
            >
              <p className="text-base sm:text-lg">
                Location: {contactInfo?.addressLine1}
              </p>

              <p className="text-sm sm:text-base">
                {contactInfo?.addressLine2}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regret;
