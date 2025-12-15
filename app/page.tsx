'use client';

import Navbar from './components/layout/Navbar';
import InputSection from './components/home/InputSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <InputSection />

      {/* Footer đơn giản */}
      <footer className="border-t border-gray-800 mt-20 py-8 text-center text-gray-500">
        <p>&copy; 2025 ShortenWorld Clone. All rights reserved.</p>
      </footer>
    </main>
  );
}