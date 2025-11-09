"use client";

import React from "react";

export default function Hero() {
  const handleJoinCommunity = () => {
    // Trigger the Join Now button click in header
    const joinButton = document.querySelector('header button[onclick]') as HTMLButtonElement;
    if (joinButton) {
      joinButton.click();
    } else {
      // Fallback: scroll to membership section
      const membershipSection = document.getElementById('membership');
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                excel
              </span>{" "}
              in Go programming
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join a supportive community of women dedicated to mastering Go. We
              provide the tools, mentorship, and opportunities you need to
              thrive in your tech career.
            </p>
            <button 
              onClick={handleJoinCommunity}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 inline-block pulse hover-bounce"
            >
              Join the Community
            </button>
          </div>

          {/* Right Content - Mascot Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary via-primary to-purple-900 p-8 flex items-center justify-center shadow-2xl relative overflow-hidden float">
              {/* Mascot Image */}
              <img 
                src="/images/mascot.png" 
                alt="Women Who Go Mascot"
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 bounce"
              />
              
              {/* Text overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <p className="text-white text-center text-sm leading-relaxed italic">
                  "Join our growing community of women Gophers"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}