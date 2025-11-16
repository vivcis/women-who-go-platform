"use client";

import React from "react";
import { useModal } from "@/contexts/ModalContext";

export default function CTA() {
  const { openAuthModal } = useModal();

  const handleJoinToday = () => {
    openAuthModal();
  };

  return (
    <section id="cta" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl p-12 text-center pulse">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of women building amazing things with Go. Your journey
            to becoming a Go expert starts here.
          </p>
          <button 
            onClick={handleJoinToday}
            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full text-base font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 inline-block hover-bounce"
          >
            Join GoWomen Today
          </button>
        </div>
      </div>
    </section>
  );
}