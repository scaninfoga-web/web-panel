import { SpiderWebBackground } from '@/components/pages/auth/Auth';
import ServiceHeroSection from '@/components/services/ServiceHeroSection';
import ServicesSection from '@/components/services/ServiceSection';
import Footer from '@/components/sub/footer';
import Navbar from '@/components/sub/navbar';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <SpiderWebBackground />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <Navbar />
        <main className="min-h-screen px-4 py-10 md:px-28 md:py-20">
          <ServiceHeroSection />
          <ServicesSection />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
