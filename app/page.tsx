"use client";

import LandingNavbar from '@/components/Home/LandingNavbar';
import HeroSection from '@/components/Home/HeroSection';

export default function HomePage() {
  return (
    <div className="relative">
      <LandingNavbar />
      <HeroSection />
    </div>
  );
}