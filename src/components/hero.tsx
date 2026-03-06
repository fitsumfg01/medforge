import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background overlay (for contrast) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>

      {/* Optional: Add a placeholder image later in public/ */}
      {/* For now we use a dark gradient background */}
      {/* <Image src="/hero-bg.jpg" alt="Medical equipment background" fill className="object-cover" priority /> */}

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
          MedForge
        </h1>
        <p className="text-xl md:text-3xl mb-10 font-light max-w-4xl mx-auto drop-shadow-lg">
          Precision Forged Medical Equipment Solutions – Built for Reliability and Innovation
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#products"
            className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-300 shadow-lg"
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="px-10 py-5 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white text-lg font-semibold rounded-lg transition duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}