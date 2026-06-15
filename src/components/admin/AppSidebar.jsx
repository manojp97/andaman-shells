import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Images,
  MessageCircleQuestion,
  Star,
  Phone,
  Menu,
  X,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Packages", url: "/admin/packages", icon: Package },
  { title: "Gallery", url: "/admin/gallery", icon: Images },
  { title: "FAQs", url: "/admin/faqs", icon: MessageCircleQuestion },
  { title: "Testimonials", url: "/admin/testimonials", icon: Star },
  { title: "Contact", url: "/admin/contact", icon: Phone },
];

export function AppSidebar() {
  useEffect(() => {
    document.title = "Admin Shell";
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* ☰ MOBILE TOP BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 bg-white p-2 shadow rounded"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <h2 className="p-4 font-bold text-lg">Andaman Shells Admin</h2>

        {/* MENU ITEMS */}
        <div className="flex flex-col gap-1 p-2">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.url}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64 p-4">{/* your pages */}</div>
    </div>
  );
}
