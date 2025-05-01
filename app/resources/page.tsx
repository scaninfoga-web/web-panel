import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Navbar />
      <main>
        Resource page
      </main>
      <Footer />
    </div>
  );
}
