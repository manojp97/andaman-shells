import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.jsx";
import CustomCarousel from "../components/Carousel.jsx";
import Cards from "../components/cards.jsx";
import Packages from "../components/Packages.jsx";
import PackageCards from "../components/PackageCards.jsx";
import Alliance from "../components/Alliance.jsx";
import ShellsCard from "../components/ShellsCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Gallery from "../components/Gallery.jsx";
import FAQs from "../components/FAQ's.jsx";
import Welcome from "../components/Welcome.jsx";
import Regret from "../components/Regret.jsx";
import Form from "../components/Form.jsx";
import FloatingWidget from "../components/FloatingWidget.jsx";

import { Helmet } from "react-helmet-async";
import API from "@/api/api";

function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // ✅ FIX: correct base URL (NO /uploads here)
  // const IMAGE_URL = "http://localhost:4000";

  // ---------------- FETCH PACKAGES ----------------
  const fetchPackages = async () => {
    try {
      const res = await API.get("/packages");
      setPackages(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FETCH GALLERY ----------------
  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");
      setGallery(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FETCH TESTIMONIALS ----------------
  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonial");
      setTestimonials(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FETCH FAQS ----------------
  const fetchFaqs = async () => {
    try {
      const res = await API.get("/faqs");
      setFaqs(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- LOAD ALL DATA ----------------
  useEffect(() => {
    fetchPackages();
    fetchGallery();
    fetchFaqs();
    fetchTestimonials();
  }, []);

  // ---------------- FILTER PACKAGES ----------------
  const filteredPackages =
    activeTab === "all"
      ? packages
      : packages.filter((item) => item.type === activeTab);

  const allianceData = [
    { image: "/a1.jpg", title: "Andaman Tourism" },
    { image: "/a2.jpg", title: "Port Blair Tourism" },
    { image: "/a3.jpg", title: "Havelock Island Tourism" },
    { image: "/a5.jpg", title: "Neil Island Tourism" },
  ];

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        {/* SEO */}
        <title>
          Andaman Shells Tours & Travels | Best Andaman Tour Packages
        </title>

        <meta
          name="description"
          content="Discover the beauty of Andaman with affordable tour packages, honeymoon trips, family vacations, island sightseeing and adventure activities."
        />

        <meta
          name="keywords"
          content="Andaman Tour Packages, Andaman Honeymoon Package, Port Blair Tour, Havelock Island Tour, Neil Island Tour, Andaman Travel Agency"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://andaman-shells-po8i.vercel.app/" />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn, Telegram) */}
        <meta
          property="og:title"
          content="Andaman Shells Tours & Travels | Best Andaman Tour Packages"
        />

        <meta
          property="og:description"
          content="Book affordable Andaman tour packages, honeymoon trips and family vacations with Andaman Shells Tours & Travels."
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://andaman-shells-po8i.vercel.app/" />

        <meta
          property="og:image"
          content="https://andaman-shells-po8i.vercel.app/og-image.jpg"
        />

        <meta
          property="og:image:secure_url"
          content="https://andaman-shells-po8i.vercel.app/og-image.jpg"
        />

        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="og:site_name" content="Andaman Shells" />

        <meta property="og:locale" content="en_US" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Andaman Shells Tours & Travels | Best Andaman Tour Packages"
        />

        <meta
          name="twitter:description"
          content="Book affordable Andaman tour packages, honeymoon trips and family vacations."
        />

        <meta
          name="twitter:image"
          content="https://andaman-shells-po8i.vercel.app/og-image.jpg"
        />

        {/* Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <Navbar />

      {/* HERO */}
      <section id="hero">
        <CustomCarousel />
      </section>

      <Cards />

      {/* PACKAGES */}
      <section id="packages" className="scroll-mt-20">
        <Packages activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((item) => (
              <PackageCards image={item.image} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      {/* ALLIANCE */}
      <section id="alliance" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
            Our Alliance
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {allianceData.map((item, index) => (
              <Alliance key={index} image={item.image} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY BOOK */}
      <section id="whybook" className="scroll-mt-20">
        <ShellsCard />
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="scroll-mt-20">
        <Testimonials testimonials={testimonials} />
      </section>

      {/* GALLERY */}
      <section id="gallery" className="scroll-mt-20">
        <Gallery images={gallery} />
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20">
        <FAQs faqs={faqs} />
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20">
        <Welcome />
        <Regret />
        <Form />
      </section>

      <FloatingWidget />
    </div>
  );
}

export default Home;
