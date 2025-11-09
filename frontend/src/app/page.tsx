import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CorePillars from "@/components/CorePillars";
import Membership from "@/components/Membership";
import Offerings from "@/components/Offerings";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CorePillars />
      <Membership />
      <Offerings />
      <CTA />
      <Footer />
    </main>
  );
}