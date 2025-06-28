import CTA from '@/components/sub/cta';
import FAQ from '@/components/sub/faq';
import Featured from '@/components/sub/featured';
import Features from '@/components/sub/features';
import Footer from '@/components/sub/footer';
import Hero from '@/components/sub/hero';
import SecurityAnimation from '@/components/sub/security-animation';
import Services from '@/components/sub/services';
import Testimonials from '@/components/sub/testimonials';

export default async function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        {/* <Featured /> */}
        <SecurityAnimation />
        <Services />
        <Features />
        {/* <Education /> */}
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
