import React from "react";
import "./footer.css"; // include custom animation here

const columns = [
  {
    title: "Discover",
    items: ["Buy & Sell", "Merchant", "Giving Back", "Help & Support"],
  },
  {
    title: "About",
    items: ["Staff", "Team", "Careers", "Blog"],
  },
  {
    title: "Resources",
    items: ["Security", "Global", "Charts", "Privacy"],
  },
  {
    title: "Social",
    items: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-800 pb-10">
        {/* Company */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Prozecto</h2>
          <p className="text-sm leading-relaxed">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
          <a
            href="#"
            className="inline-block mt-4 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
          >
            read more →
          </a>
        </div>

        {/* Other Columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-white text-lg font-semibold mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="rolling-link">
                    <span>{item}</span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>
          © {new Date().getFullYear()} Prozecto. All rights reserved | Made with
          ❤️ by Prozecto
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          {["Terms", "Privacy", "Compliances"].map((t) => (
            <a key={t} href="#" className="rolling-link">
              <span>{t}</span>
              <span>{t}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
