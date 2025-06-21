import BookInformation from '@/components/services/BookInformation';
import FullServiceHeroSection from '@/components/services/FullServiceHeroSection';
import LeftRightComponents from '@/components/services/LeftRightComponents';
import ServicesMiniCards from '@/components/services/ServicesMiniCards';
import Footer from '@/components/sub/footer';
import { providedServices } from '@/lib/constant';

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export async function generateStaticParams() {
  return providedServices.map((service) => ({
    service: service.title.toLowerCase().replace(/\s|_/g, ''),
  }));
}

export default async function Page({ params }: PageProps) {
  const { service } = await params;
  const matchedService = providedServices.find((s) => {
    return (
      s.title.toLowerCase().replace(/\s|_/g, '') ===
      service.toLowerCase().replace(/\s|_/g, '')
    );
  });
  matchedService?.leftRightComponents;
  if (!matchedService) {
    return (
      <div className="flex h-screen animate-pulse items-center justify-center text-xl font-semibold text-white/75">
        service is not found
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-32">
      <FullServiceHeroSection
        title={matchedService.title}
        smallDescription={matchedService.description}
        longDescription={matchedService.detailedDescription}
      />
      <LeftRightComponents leftRight={matchedService.leftRightComponents} />
      <ServicesMiniCards
        title={matchedService.endingComponents.title}
        serviceCard={matchedService.endingComponents.serviceCard}
      />
      <BookInformation />
      <Footer />
    </div>
  );
}
