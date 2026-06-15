"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import {
  LayoutDashboard,
  Package,
  Images,
  MessageCircleQuestion,
  Star,
  Phone,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Packages",
    url: "/admin/packages",
    icon: Package,
  },
  {
    title: "Gallery",
    url: "/admin/gallery",
    icon: Images,
  },
  {
    title: "FAQs",
    url: "/admin/faqs",
    icon: MessageCircleQuestion,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Contacts",
    url: "/admin/contact",
    icon: Phone,
  },
];

export function AppSidebar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout Error:", error);
    }

    navigate("/admin/login", { replace: true });
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      {...props}
    >
      {/* Header */}
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold leading-none">
              Andaman Shells
            </h2>

            <p className="text-xs text-muted-foreground">
              Admin Panel
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                >
                  <Link
                    to={item.url}
                    className="flex items-center gap-3"
                  >
                    <Icon className="h-5 w-5 shrink-0" />

                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-5 w-5 shrink-0 text-red-500 cursor-pointer" />

              <span className="group-data-[collapsible=icon]:hidden text-red-500 cursor-pointer">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}