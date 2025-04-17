
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import Navbar from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="fixed inset-0 w-full h-full bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative z-10">
        <Navbar />
        <DashboardSidebar />
        <main className="pl-72 pr-10 mt-20">
          {children}
        </main>
      </div>
    </div>
    </>
  )
}
