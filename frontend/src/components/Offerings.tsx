"use client";

import React from "react";
import { IconRenderer } from "./shared/IconRenderer";
import type { Offering } from "@/types";

const offerings: Offering[] = [
  {
    icon: "calendar",
    title: "Monthly Virtual Meetups",
    description:
      "Join our monthly online meetings to learn from experts and network with other members.",
  },
  {
    icon: "code",
    title: "Hands-on Projects",
    description:
      "Gain practical experience by collaborating on real-world projects with fellow members.",
  },
  {
    icon: "message",
    title: "Community Forum",
    description:
      "Get help, share your knowledge, and connect with the community in our private forum.",
  },
  {
    icon: "ticket",
    title: "Conference Access",
    description:
      "Receive discounted and special access to major Go conferences and events.",
  },
];


export default function Offerings() {
  return (
    <section id="resources" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our membership provides you with exclusive access to a wide range of
            benefits designed to accelerate your growth and connect you with
            peers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <div className="text-primary group-hover:text-white transition-colors duration-300">
                  <IconRenderer icon={offering.icon} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                {offering.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}