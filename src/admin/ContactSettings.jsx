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
          <h1 className="text-xl font-bold">
            Contact Settings
          </h1>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-6">
          <Card className="max-w-5xl p-6 mx-auto border rounded">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* PHONE + WHATSAPP */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />

                <Input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp Number"
                />
              </div>

              {/* EMAIL + WEBSITE */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />

                <Input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="Website"
                />
              </div>

              {/* ADDRESS */}
              <Input
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                placeholder="Address Line 1"
              />

              <Input
                name="addressLine2"
                value={form.addressLine2}
                onChange={handleChange}
                placeholder="Address Line 2"
              />

              {/* MAP LINK */}
              <textarea
                name="mapsLink"
                value={form.mapsLink}
                onChange={handleChange}
                rows={4}
                placeholder="Google Maps Link"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full border rounded bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
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