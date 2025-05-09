import Hero from '@/components/pages/hero/hero';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Education from '@/components/education';
import Features from '@/components/features';
import Testimonials from '@/components/testimonials';
import CTA from '@/components/cta';
import Footer from '@/components/footer';
import SecurityAnimation from '@/components/security-animation';
import FAQ from '@/components/faq';

export default async function Home() {
  return (
    <div className="bg-[url('/images/grid.svg')]">
      {/* <div className="inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}
      {/* <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}
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
