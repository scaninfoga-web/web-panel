import Footer from '@/components/footer';
import LeftRightComponents from '@/components/services/LeftRightComponents';
import { providedServices } from '@/lib/constant';
import FullServiceHeroSection from '@/components/services/FullServiceHeroSection';
import EndingInformation from '@/components/services/EndingInformation';

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
      <EndingInformation endDescription={matchedService.endDescription} />
      <Footer />
    </div>
  );
}
