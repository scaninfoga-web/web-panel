// import Link from 'next/link';
// import {
//   Shield,
//   Mail,
//   Phone,
//   MapPin,
//   Github,
//   Twitter,
//   Linkedin,
//   Facebook,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';

// export default function Footer() {
//   return (
//     <footer className="border-t border-green-950">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-5 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
//           <div className="border-r border-green-950">
//             <Link href="/" className="relative left-0 flex">
//               {/* <Shield className="h-8 w-8 text-emerald-500" />
//               <span className="text-xl font-bold tracking-tight">
//                 <span className="text-emerald-500">scan</span>infoga
//               </span> */}
//               <Image
//                 src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/4.png"
//                 alt="scaninfoga"
//                 // className="border object-contain"
//                 className="relative -left-5 bottom-7"
//                 width={250}
//                 height={250}
//               />
//             </Link>
//             <p className="relative bottom-4 pr-2 text-white/70">
//               Pioneers in cyber security and digital crime investigation,
//               Scaninfoga proudly launches the world’s first OSINT-based tool
//               offering real, high-sensitive data for law enforcement and private
//               detective work. From VAPT services to deep digital footprint
//               analysis, we lead the charge in solving cybercrime with unmatched
//               intelligence.
//             </p>
//             <div className="flex space-x-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
//               >
//                 <Github className="h-5 w-5" />
//                 <span className="sr-only">GitHub</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
//               >
//                 <Twitter className="h-5 w-5" />
//                 <span className="sr-only">Twitter</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
//               >
//                 <Linkedin className="h-5 w-5" />
//                 <span className="sr-only">LinkedIn</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
//               >
//                 <Facebook className="h-5 w-5" />
//                 <span className="sr-only">Facebook</span>
//               </Button>
//             </div>
//           </div>

//           <div className="border-r border-green-950">
//             <h3 className="mb-4 text-lg font-semibold">About Us</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Private Investigator
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/services"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Penetration Testing
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/tools"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   API Security Testing
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/tools"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Application Security
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/blog"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Consulting Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Brand Protection
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Hire Hacker
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Vulnerability Disclosure Program
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="border-r border-green-950">
//             <h3 className="mb-4 text-lg font-semibold">Company</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/tools"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Career
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/blog"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Partners
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Portfolio
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Case Studies
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/services"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Event & Camping
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Media & Press Kit
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-white/70 transition-colors hover:text-emerald-400"
//                 >
//                   Blog & Success Stories
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className=" ">
//             <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
//             <span className="text-white/70">
//               <p>
//                 Whether you're a law enforcement agency, corporate security
//                 team, or an individual seeking digital justice, Scaninfoga is
//                 your trusted partner.
//               </p>
//             </span>
//             <ul className="mr-4 mt-2 space-y-3 border-t-[0.5px] border-slate-800 pt-4">
//               <li className="flex items-start space-x-3">
//                 <Mail className="mt-0.5 h-5 w-5 text-emerald-500" />
//                 <span className="text-white/70">support@scaninfoga.com</span>
//               </li>
//               <li className="flex items-start space-x-3">
//                 <Phone className="mt-0.5 h-5 w-5 text-emerald-500" />
//                 <span className="text-white/70">+91 9403893177</span>
//               </li>
//               <li className="flex items-start space-x-3">
//                 <MapPin className="mt-0.5 h-5 w-5 text-emerald-500" />
//                 <span className="text-white/70">
//                   Lokhand Market Road, Mavi Mumbai 410218, MH, India
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-12 flex flex-col items-center justify-between border-t border-green-950 pt-8 md:flex-row">
//           <p className="text-sm text-white/60">
//             &copy; {new Date().getFullYear()} ScanInfoga. All rights reserved.
//           </p>
//           <div className="mt-4 flex space-x-6 md:mt-0">
//             <Link
//               href="/terms"
//               className="text-sm text-white/60 transition-colors hover:text-emerald-400"
//             >
//               Terms & Conditions
//             </Link>
//             <Link
//               href="/privacy"
//               className="text-sm text-white/60 transition-colors hover:text-emerald-400"
//             >
//               Privacy Policy
//             </Link>

//             <Link
//               href="/terms"
//               className="text-sm text-white/60 transition-colors hover:text-emerald-400"
//             >
//               Refund Policy
//             </Link>
//             <Link
//               href="/sitemap"
//               className="text-sm text-white/60 transition-colors hover:text-emerald-400"
//             >
//               Disclaimer
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from 'next/link';
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-green-950 bg-[#060b17] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/4.png"
                alt="scaninfoga"
                className="object-contain"
                width={180}
                height={180}
              />
            </Link>
            <p className="text-sm text-white/70">
              Pioneers in cyber security and digital crime investigation,
              Scaninfoga proudly launches the world’s first OSINT-based tool
              offering real, high-sensitive data for law enforcement and private
              detective work.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin, Facebook].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:bg-emerald-500/10 hover:text-emerald-500"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{Icon.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Private Investigator', href: '/about' },
                { label: 'Penetration Testing', href: '/services' },
                { label: 'API Security Testing', href: '/tools' },
                { label: 'Application Security', href: '/tools' },
                { label: 'Consulting Services', href: '/blog' },
                { label: 'Brand Protection', href: '/contact' },
                { label: 'Hire Hacker', href: '/contact' },
                { label: 'Vulnerability Disclosure Program', href: '/contact' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Career', href: '/tools' },
                { label: 'Partners', href: '/blog' },
                { label: 'Portfolio', href: '/contact' },
                { label: 'Case Studies', href: '/contact' },
                { label: 'Event & Camping', href: '/services' },
                { label: 'Media & Press Kit', href: '/contact' },
                { label: 'Blog & Success Stories', href: '/contact' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-white/70">
              Whether you're a law enforcement agency, corporate security team,
              or an individual seeking digital justice, Scaninfoga is your
              trusted partner.
            </p>
            <ul className="space-y-3 border-t border-slate-800 pt-4 text-sm">
              <li className="flex items-start space-x-3">
                <Mail className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span>support@scaninfoga.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span>+91 9403893177</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 text-emerald-500" />
                <span>Lokhand Market Road, Navi Mumbai 410218, MH, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-green-950 pt-8 md:flex-row md:space-y-0">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} ScanInfoga. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 text-sm">
            <Link
              href="/terms"
              className="text-white/60 transition-colors hover:text-emerald-400"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-white/60 transition-colors hover:text-emerald-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/60 transition-colors hover:text-emerald-400"
            >
              Refund Policy
            </Link>
            <Link
              href="/sitemap"
              className="text-white/60 transition-colors hover:text-emerald-400"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
