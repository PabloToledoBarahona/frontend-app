'use client';

import Image from 'next/image';
import GradientButton from './GradientButton';
import { motion } from 'framer-motion';
import illustration from '/public/landing-illustration.png';

export default function HeroContent() {
  return (
    <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-10 pt-20 pb-40 px-6 max-w-6xl mx-auto z-10">
      <motion.div
        className="max-w-xl text-center lg:text-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold uppercase text-white leading-tight">
          Business<br />Landing Page
        </h1>
        <p className="text-gray-200 mt-4 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.
        </p>
        <GradientButton label="More Info" />
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl p-4 shadow-lg"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src={illustration}
          alt="Landing Illustration"
          width={400}
          height={300}
          className="rounded-xl"
        />
      </motion.div>
    </div>
  );
}