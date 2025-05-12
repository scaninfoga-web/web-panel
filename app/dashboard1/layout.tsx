import { ReactNode } from 'react';

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="px-10 pb-8 pt-20">{children}</main>
    </>
  );
}
