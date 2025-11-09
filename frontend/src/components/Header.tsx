"use client";

import React, { useState } from "react";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Membership", href: "#membership", section: "membership" },
  { label: "Resources", href: "#resources", section: "resources" },
  { label: "Why Join Us?", href: "#why-join", section: "why-join" },
];

// For always empty form:
const defaultFormData = {
  name: "",
  email: "",
  location: "",
  skill_level: "beginner"
};

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ ...defaultFormData });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinNow = () => {
    // Reset form to default values when opening modal
    setFormData({ ...defaultFormData });
    setShowAuthModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearForm = () => {
    // Reset to empty form
    setFormData({
      name: "",
      email: "",
      location: "",
      skill_level: "beginner"
    });
  };

  const resetFormToDefaults = () => {
    // Reset to default demo values
    setFormData({ ...defaultFormData });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Submitting directly to backend:', formData);
      
      // DIRECT connection to backend
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        alert('🎉 Welcome to GoWomen! Please proceed to select a membership plan.');
        setShowAuthModal(false);
        clearForm(); // Clear form after successful submission
        scrollToSection('membership');
      } else if (response.status === 409) {
        // Email already exists - this is actually good! User can proceed
        alert('✅ Welcome back! You already have an account. Please proceed to select a membership plan.');
        setShowAuthModal(false);
        clearForm(); // Clear form for returning users too
        scrollToSection('membership');
      } else {
        alert('❌ Registration failed: ' + (result.error || `Status: ${response.status}`));
        // Don't clear form on error so user can fix and resubmit
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('🔴 Cannot connect to backend. Please ensure it\'s running on localhost:8080');
      // Don't clear form on connection error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
    // Clear form when closing modal
    clearForm();
  };

  const handleCancel = () => {
    setShowAuthModal(false);
    clearForm();
  };

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:8080/health');
      const data = await response.json();
      console.log('Backend health:', data);
      alert(`✅ Backend is running: ${data.message}`);
    } catch (error) {
      console.error('Backend health check failed:', error);
      alert('❌ Backend is not accessible. Please start your Go backend server.');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Mascot */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/images/mascot.png"
                  alt="GoWomen Mascot"
                  width={32}
                  height={32}
                  className="object-contain bounce"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">
                GoWomen
                <span className="text-sm font-normal text-gray-600">| Home</span>
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section || '')}
                  className="text-gray-700 hover:text-primary transition-all duration-200 text-sm font-medium hover:scale-105"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              {/* <button 
                onClick={testBackendConnection}
                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition-colors"
                title="Test backend connection"
              >
                ✅ Backend OK
              </button> */}
              <button 
                onClick={handleJoinNow}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover-bounce"
              >
                Join Now
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Join GoWomen</h3>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your city/country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <select
                  name="skill_level"
                  value={formData.skill_level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}