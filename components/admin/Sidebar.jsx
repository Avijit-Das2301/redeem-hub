"use client";

import { useState } from "react";
import { Home, FilePlus2, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const scrollToSection = (id) => {
    setActive(id);
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // adjust to account for fixed navbar height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "generate-code", label: "Generate Code", icon: FilePlus2 },
    { id: "redemption-history", label: "Redemption History", icon: Clock },
  ];

  return (
    <aside className="bg-[#0f172a] text-white rounded-2xl shadow-lg p-5 w-64 sticky top-20 h-fit ml-6 mt-6">
      <h2 className="text-lg font-semibold mb-5 text-center tracking-wide text-white">
        UNLOCK REWARDS
      </h2>

      <nav className="space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all cursor-pointer ${
              active === id
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-yellow-400"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
