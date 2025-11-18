"use client";

import React from "react";
import { IconRenderer } from "./shared/IconRenderer";
import type { CorePillar } from "@/types";

const pillars: CorePillar[] = [
  {
    icon: "book",
    title: "Curated Learning",
    description:
      "Access structured learning paths and resources designed to help you master Go, from fundamentals to advanced concepts.",
  },
  {
    icon: "users",
    title: "Expert Mentorship",
    description:
      "Connect with experienced women in the industry who can guide you, answer your questions, and support your journey.",
  },
  {
    icon: "chart",
    title: "Career Growth",
    description:
      "Find resources, job boards, and networking opportunities to help you advance your career in the Go ecosystem.",
  },
];


export default function CorePillars() {
  return (
    <section id="why-join" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Core Pillars
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  <IconRenderer icon={pillar.icon} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}