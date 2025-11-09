import React from "react";
import { Triangle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            <Triangle className="w-5 h-5 fill-primary text-primary rotate-180" />
            <span className="text-gray-600 text-sm">
              © {currentYear} GoWomen. All rights reserved
            </span>
          </div>

          {/* Footer Links */}
          <div className="flex items-center gap-6">
            <a
              href="#terms"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="#privacy"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a
              href="#contact"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
