import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* More sections coming soon: Products, Services, etc. */}
      <div className="h-96 bg-gray-100 flex items-center justify-center text-2xl text-gray-600">
        (Next: Products section placeholder)
      </div>
    </main>
  );
}