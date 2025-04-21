"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Illustration from "../../../public/landing-illustration.png";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-36 flex flex-col-reverse lg:flex-row items-center justify-center gap-16 relative z-10 min-h-[calc(100vh-80px)]">
        {/* Texto */}
        <motion.div
          className="max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            ¡COBRA FÁCIL <br /> Y RÁPIDO!
          </h1>
          <p className="mt-4 text-gray-600">
            Olvídate del seguimiento manual. Con TeLoCobro puedes programar
            recordatorios, llevar el control de pagos y gestionar tus clientes
            desde un solo lugar.
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 transition">
            Más Información
          </button>
        </motion.div>

        {/* Ilustración */}
        <motion.div
          className="w-[300px] lg:w-[400px] mb-10 lg:mb-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={Illustration}
            alt="Illustration"
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Curva Inferior */}
      <div className="absolute bottom-[-1px] left-0 w-full z-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradient)"
            d="M0,96L48,101.3C96,107,192,117,288,133.3C384,149,480,171,576,181.3C672,192,768,192,864,170.7C960,149,1056,107,1152,85.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}