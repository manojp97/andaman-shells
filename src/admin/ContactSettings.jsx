import { useEffect, useState } from "react";
import API from "@/api/api";

import { Helmet } from "react-helmet-async";
import { Loader2 } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function ContactSettings() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    mapsLink: "",
  });

  // =========================
  // GET API (FETCH DATA)
  // =========================
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await API.get("/contact-info");

      const data = res.data?.data;

      console.log("GET RESPONSE:", data);

      if (data) {
        setForm({
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          website: data.website || "",
          addressLine1: data.addressLine1 || "",
          addressLine2: data.addressLine2 || "",
          mapsLink: data.mapsLink || "",
        });
      }
    } catch (error) {
      console.log("GET ERROR:", error?.response?.data || error);
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE API (ADD / UPDATE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put("/contact-info", form);

      alert("Contact Updated Successfully");
    } catch (error) {
      console.log("SAVE ERROR:", error?.response?.data || error);
      alert("Failed to save contact info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Helmet>
        <title>Contact Settings | Admin Panel</title>
      </Helmet>

      <AppSidebar />

      <SidebarInset>
        {/* HEADER */}
        <header className="flex h-16 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Contact Settings</h1>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-6">
          <Card className="max-w-5xl p-6 mx-auto border rounded">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* PHONE + WHATSAPP */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block mb-2 text-sm font-medium"
                  >
                    WhatsApp Number
                  </label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter WhatsApp number"
                  />
                </div>
              </div>

              {/* EMAIL + WEBSITE */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium"
                  >
                    Website
                  </label>
                  <Input
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="Enter website URL"
                  />
                </div>
              </div>

              {/* ADDRESS LINE 1 */}
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block mb-2 text-sm font-medium"
                >
                  Address Line 1
                </label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  placeholder="House / Building / Street"
                />
              </div>

              {/* ADDRESS LINE 2 */}
              <div>
                <label
                  htmlFor="addressLine2"
                  className="block mb-2 text-sm font-medium"
                >
                  Address Line 2
                </label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Area / Landmark / City"
                />
              </div>

              {/* MAP LINK */}
              <div>
                <label
                  htmlFor="mapsLink"
                  className="block mb-2 text-sm font-medium"
                >
                  Google Maps Link
                </label>

                <textarea
                  id="mapsLink"
                  name="mapsLink"
                  value={form.mapsLink}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Paste Google Maps location link here"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto border rounded bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Contact Settings"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
