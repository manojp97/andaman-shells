import { useEffect, useState } from "react";
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

const PackageCards = ({ image, title }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await API.get("/contact-info");
      setContactInfo(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/contacts", form);

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message || "Enquiry Submitted Successfully!");

        setForm({
          name: "",
          phone: "",
          message: "",
        });

        setOpen(false);
      }
    } catch (error) {
      console.error("Contact Error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
        <a
          href={`https://api.whatsapp.com/send?phone=${contactInfo?.whatsapp?.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="rounded border bg-green-500 hover:bg-green-600 text-white p-5">
            WhatsApp
          </Button>
        </a>

        <a href={`tel:${contactInfo?.phone}`}>
          <Button className="rounded border bg-sky-400 hover:bg-sky-500 text-white p-5">
            Get Callback
          </Button>
        </a>

        {/* Enquire Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded border bg-red-600 hover:bg-red-700 text-white p-5">
              Enquire
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] bg-white border-white">
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block mb-2 font-medium">Your Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border p-3 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Phone Number</label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full border p-3 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full border p-3 rounded"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PackageCards;
