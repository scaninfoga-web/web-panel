// 'use client';

import LeftSection from './leftSection';
import RightSection from './rightSection';

export default function Hero() {
  return (
    <section className="custom-grad-1 flex h-screen w-screen items-center justify-center">
      <div>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <LeftSection />
          <RightSection />
        </div>
      </div>
    </section>
  );
}
