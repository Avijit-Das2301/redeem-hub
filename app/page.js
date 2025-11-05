"use client";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="card max-w-4xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Unlock Exclusive Benefits. <br /> Instantly.
            </h1>
            <p className="text-gray-600 mb-6">
              Your gateway to rewards, discounts, and special access. Generate
              codes as admin, redeem as a user.
            </p>

            <div className="flex gap-4">
              <a
                href="/redeem"
                className="px-5 py-2 rounded-lg bg-slate-900 text-white hover:opacity-95"
              >
                Get Started
              </a>
              <a
                href="#learn"
                className="px-5 py-2 rounded-lg border border-slate-200 bg-white"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="w-56 h-56 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="key chest"
              className="w-48 h-48 drop-shadow-lg"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
