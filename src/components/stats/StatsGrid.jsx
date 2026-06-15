import {
  Package,
  Images,
  MessageCircleQuestion,
  Star,
  Phone,
} from "lucide-react";

import { StatCard } from "./StatCard";

export default function StatsGrid({ stats }) {
  const data = [
    { title: "Packages", value: stats.packages, Icon: Package, iconColor: "text-blue-500" },
    { title: "Gallery", value: stats.gallery, Icon: Images, iconColor: "text-green-500" },
    { title: "FAQs", value: stats.faqs, Icon: MessageCircleQuestion, iconColor: "text-orange-500" },
    { title: "Testimonials", value: stats.testimonials, Icon: Star, iconColor: "text-yellow-500" },
    { title: "Contacts", value: stats.contacts, Icon: Phone, iconColor: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {data.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
}