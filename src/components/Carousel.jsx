import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import API from "@/api/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const images = [
  { src: "/Banner 1.jpg", alt: "Andaman Tour Package" },
  { src: "/banner2.jpg", alt: "Havelock Island Beach" },
  { src: "/banner3.jpg", alt: "Port Blair Tourism" },
];

export default function CustomCarousel() {
  // ✅ ALL STATES HERE
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // ✅ CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/contacts", form);

      if (res?.status === 200 || res?.status === 201) {
        alert("Enquiry Submitted Successfully!");

        setForm({
          name: "",
          phone: "",
          message: "",
        });

        setOpen(false);
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <ShadCarousel className="w-full">
        <CarouselContent className="ml-0">
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[70vh] md:h-[85vh] lg:h-screen w-full">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40">
                  <div className="flex h-full items-center justify-center px-4">
                    <div className="text-center text-white max-w-4xl">
                      <h2 className="text-lg md:text-3xl font-bold">
                        Get the Best Price with Local Expertise
                      </h2>

                      <h1 className="mt-4 text-3xl md:text-6xl font-bold">
                        Compare Before You Book!
                      </h1>

                      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        {/* ✅ BOOK NOW DIALOG */}
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <button className="rounded-full bg-sky-400 px-6 py-3 font-bold text-black hover:bg-sky-300 transition">
                              BOOK NOW
                            </button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-125 bg-white">
                            <DialogHeader>
                              <DialogTitle>Contact Us</DialogTitle>
                            </DialogHeader>

                            <form
                              onSubmit={handleSubmit}
                              className="space-y-4 mt-4"
                            >
                              {/* NAME */}
                              <div>
                                <label
                                  htmlFor="name"
                                  className="block mb-2 font-medium"
                                >
                                  Your Name
                                </label>
                                <input
                                  id="name"
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  placeholder="Enter your full name"
                                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 "
                                  required
                                />
                              </div>

                              {/* PHONE */}
                              <div>
                                <label
                                  htmlFor="phone"
                                  className="block mb-2 font-medium"
                                >
                                  Phone Number
                                </label>
                                <input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  value={form.phone}
                                  onChange={handleChange}
                                  placeholder="Enter your phone number"
                                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 "
                                  required
                                />
                              </div>

                              {/* MESSAGE */}
                              <div>
                                <label
                                  htmlFor="message"
                                  className="block mb-2 font-medium"
                                >
                                  Message
                                </label>
                                <textarea
                                  id="message"
                                  name="message"
                                  value={form.message}
                                  onChange={handleChange}
                                  placeholder="Write your message here..."
                                  rows={4}
                                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 "
                                  required
                                />
                              </div>

                              {/* SUBMIT BUTTON */}
                              <Button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white bg-blue-500 hover:bg-blue-600"
                              >
                                {loading ? "Sending..." : "Send Message"}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>

                        {/* ✅ SCROLL BUTTON */}
                        <button
                          onClick={() =>
                            document
                              .getElementById("packages")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="rounded-full border border-sky-400 px-6 py-3 font-bold text-white hover:bg-sky-400 transition"
                        >
                          OUR PACKAGES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex left-4" />
        <CarouselNext className="hidden md:flex right-4" />
      </ShadCarousel>
    </div>
  );
}
