'use client';

import GradientButton from './GradientButton';

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-900">TeLoCobro</div>
        <ul className="hidden md:flex gap-10 text-gray-800 font-medium">
          <li><a href="#">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Course</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="hidden md:block">
          <GradientButton label="Get Started" />
        </div>
      </nav>
    </header>
  );
}