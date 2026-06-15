import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import API from "@/api/api";

import { AppSidebar } from "@/components/app-sidebar";
import StatsGrid from "@/components/stats/StatsGrid";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const [stats, setStats] = useState({
    packages: 0,
    gallery: 0,
    faqs: 0,
    testimonials: 0,
    contacts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [packagesRes, galleryRes, faqRes, testimonialRes, contactsRes] =
          await Promise.all([
            API.get("/packages"),
            API.get("/gallery"),
            API.get("/faqs"),
            API.get("/testimonial"),
            API.get("/contacts"), // contacts API
          ]);

        setStats({
          packages: packagesRes.data?.data?.length || 0,
          gallery: galleryRes.data?.data?.length || 0,
          faqs: faqRes.data?.data?.length || 0,
          testimonials: testimonialRes.data?.data?.length || 0,
          contacts: contactsRes.data?.data?.length || 0,
        });
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <SidebarProvider>
      <Helmet>
        <title>Dashboard | Andaman Shells Admin</title>
      </Helmet>

      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-3 border-b px-4">
          <SidebarTrigger />

          <Separator orientation="vertical" className="h-4" />

          <div>
            <h1 className="text-2xl font-bold">Andaman Shells Admin</h1>
            <p className="text-sm text-muted-foreground">Dashboard Overview</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-12">
          {/* Stats */}
          <StatsGrid stats={stats} />

          {/* Welcome Card */}
          <Card className="border rounded-xl shadow p-0">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                Welcome to Andaman Shells Admin Panel
              </h2>

              <p className="text-muted-foreground">
                Manage Packages, Gallery Images, FAQs, Testimonials and Contact
                Enquiries from one place.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
