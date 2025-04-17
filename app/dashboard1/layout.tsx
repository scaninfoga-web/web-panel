import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function DashLayout({
    children
}: {
    children: ReactNode
}){
    return (
        <>
        <Navbar />
        <main className="pt-20 pb-8 px-10">{children}</main>
        </>
    )
}