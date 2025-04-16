import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Education from "@/components/education"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import SecurityAnimation from "@/components/security-animation"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Navbar />
      <main>
        <Hero />
        <SecurityAnimation />
        <Services />
        <Features />
        <Education />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
