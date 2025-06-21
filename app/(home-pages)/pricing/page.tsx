import Footer from '@/components/sub/footer';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';
import PricingPlans from '../../../components/sub/pricing-plans';

export default function PricingPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <main>
          <PricingPlans />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
