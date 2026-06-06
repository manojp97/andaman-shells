import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import CustomCarousel from "./components/Carousel.jsx";
import Cards from "./components/Cards.jsx";
import Packages from "./components/Packages.jsx";
import PackageCards from "./components/PackageCards.jsx";
import Alliance from "./components/Alliance.jsx";
import ShellsCard from "./components/ShellsCard.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Gallery from "./components/Gallery.jsx";
import FAQs from "./components/FAQ's.jsx";
import Welcome from "./components/Welcome.jsx";
import Regret from "./components/Regret.jsx";
import Form from "./components/Form.jsx";
import FloatingWidget from "./components/FloatingWidget.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("all");

  const packages = [
    { image: "/p1.jpg", title: "Honeymoon Package", type: "honeymoon" },
    { image: "/p2.jpg", title: "Family Package", type: "family" },
    { image: "/p3.jpg", title: "Women Package", type: "women" },
    { image: "/p4.jpg", title: "Golden Age Package", type: "golden" },
    { image: "/p5.jpg", title: "Couple Friendly Package", type: "couple" },
    { image: "/p7.jpg", title: "Luxury Package", type: "luxury" },
  ];

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
      <Navbar />
      <section id="hero">
        <CustomCarousel />
      </section>

      <Cards />

      <section id="packages" className="scroll-mt-20">
        <Packages activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((item, index) => (
              <PackageCards key={index} image={item.image} title={item.title} />
            ))}
          </div>
        </div>
      </section>

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

      <section id="whybook" className="scroll-mt-20">
        <ShellsCard />
      </section>

      <section id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </section>

      <section id="gallery" className="scroll-mt-20">
        <Gallery />
      </section>

      <section id="faq" className="scroll-mt-20">
        <FAQs />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Welcome />
        <Regret />
        <Form />
      </section>

      <FloatingWidget />
    </div>
  );
}

export default App;
