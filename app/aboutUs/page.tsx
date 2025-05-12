import AboutUsSection from '@/components/about-us';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-4 py-10 md:px-28">
          <AboutUsSection />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
