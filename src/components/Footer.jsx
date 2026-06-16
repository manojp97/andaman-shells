import React from "react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import API from "@/api/api";
import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
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
    <footer className="bg-black/60 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white">Andaman Shells</h2>
          <p className="mt-3 text-sm text-gray-300">
            Explore India’s most beautiful islands and beaches with our curated
            travel packages. Experience nature, adventure, and peace in one
            place.
          </p>
        </div>

        {/* Islands */}
        <div>
          <h3 className="font-semibold text-white mb-3">Top Islands</h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/destination/havelock-island" target="_blank">
                Havelock Island
              </Link>
            </li>

            <li>
              <Link to="/destination/neil-island" target="_blank">
                Neil Island
              </Link>
            </li>

            <li>
              <Link to="/destination/ross-island" target="_blank">
                Ross Island
              </Link>
            </li>

            <li>
              <Link to="/destination/baratang-island" target="_blank">
                Baratang Island
              </Link>
            </li>
          </ul>
        </div>

        {/* Beaches */}
        <div>
          <h3 className="font-semibold text-white mb-3">Popular Beaches</h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/destination/radhanagar-beach" target="_blank">
                Radhanagar Beach
              </Link>
            </li>

            <li>
              <Link to="/destination/elephant-beach" target="_blank">
                Elephant Beach
              </Link>
            </li>

            <li>
              <Link to="/destination/corbyn-cove" target="_blank">
                Corbyn's Cove
              </Link>
            </li>

            <li>
              <Link to="/destination/kalapathar-beach" target="_blank">
                Kalapathar Beach
              </Link>
            </li>

            <li>
              <Link to="/destination/laxmanpur-beach" target="_blank">
                Laxmanpur Beach
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact Us</h3>

          <div className="space-y-2 text-sm text-gray-300">
            <p>📞 +{contactInfo?.phone}</p>
            <p>📧 {contactInfo?.email}</p>
            <p>📍 {contactInfo?.addressLine1}</p>
            <p> {contactInfo?.addressLine2}</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl p-5">
            <a
              href="https://www.instagram.com/andaman.shells"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
            </a>
            <a
              href="https://www.facebook.com/dmcandamanshells"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="cursor-pointer hover:text-blue-500" />
            </a>
            <a
              href="https://www.youtube.com/@andamanshells2738"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="cursor-pointer hover:text-red-500" />
            </a>
            <a
              href="https://www.linkedin.com/company/andamanshells/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="cursor-pointer hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom */}
      <div className="text-center text-sm text-gray-200 py-4">
        © {new Date().getFullYear()} Andaman Shells. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
