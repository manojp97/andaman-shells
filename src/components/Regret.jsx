import React from "react";

const Regret = () => {
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
              href="tel:+919599227385"
              className="text-base sm:text-lg hover:text-sky-500"
            >
              Call: +91 9599227385
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
              href="mailto:shellsandaman@gmail.com"
              className="text-base sm:text-lg hover:text-sky-500"
            >
              Email: shellsandaman@gmail.com
            </a>
            <p className="text-sm sm:text-base">Web: www.andamanshells.com</p>
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
              href="https://maps.google.com/?q=Anand+Marg+Road+Junglighat+Sri+Vijaya+Puram+Andaman+744103"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center hover:text-sky-500"
            >
              <p className="text-base sm:text-lg">
                Location: Anand Marg Road, Junglighat,
              </p>
              <p className="text-sm sm:text-base">
                Sri Vijaya Puram, A & N Islands 744103
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regret;
