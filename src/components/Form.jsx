import { useState } from "react";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Strong validation
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      alert("All fields are required");
      return;
    }

    if (form.phone.length < 10) {
      alert("Invalid phone number");
      return;
    }

    try {
      setLoading(true);

      //  API CALL
      const res = await API.post("/contacts", {
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      console.log("CONTACT RESPONSE:", res.data);

      alert("Message sent successfully!");

      // reset form
      setForm({
        name: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Map */}
        <div className="w-full h-100 overflow-hidden shadow">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Sri%20Vijaya%20Puram%20Andaman%20and%20Nicobar%20India&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4" id="enquiry-form">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Your Name
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border p-3 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white rounded"
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
        </div>
      </div>
    </div>
  );
}
