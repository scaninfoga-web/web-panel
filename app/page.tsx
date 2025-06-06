import CTA from '@/components/sub/cta';
import Education from '@/components/sub/education';
import FAQ from '@/components/sub/faq';
import Features from '@/components/sub/features';
import Footer from '@/components/sub/footer';
import Hero from '@/components/sub/hero';
import SecurityAnimation from '@/components/sub/security-animation';
import Services from '@/components/sub/services';
import Testimonials from '@/components/sub/testimonials';

export default async function Home() {
  // const token = useSelector((state: RootState) => state.user.token);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <main>
        <Hero />
        <SecurityAnimation />
        <Services />
        <Features />
        <Education />
        <Testimonials />
        <FAQ />
        <CTA
          whiteTitle="Ready to Secure Your"
          description="Get in touch with our security experts for a free consultation
                  and discover how we can help protect your organization from
                  cyber threats."
          greenTitle="Digital Assets"
        />
      </main>
      <Footer />
    </div>
  );
}
