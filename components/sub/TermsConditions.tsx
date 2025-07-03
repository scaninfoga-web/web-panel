import React from 'react';
import {
  Shield,
  FileText,
  Globe,
  Users,
  AlertCircle,
  Scale,
} from 'lucide-react';

export default function TermsConditions() {
  const sections = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Content & Website Usage',
      content: [
        'The content of the pages of this website is subject to change without notice.',
        'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.',
        'Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable.',
      ],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Intellectual Property',
      content: [
        'Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics.',
        'Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
        'All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.',
      ],
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'External Links & Authorization',
      content: [
        'From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.',
        "You may not create a link to our website from another website or document without SCANINFOGA SOLUTIONS PRIVATE LIMITED's prior written consent.",
        'Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.',
      ],
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: 'Governing Law & Liability',
      content: [
        'Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.',
        'We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 -top-1/2 h-full w-full animate-pulse rounded-full to-blue-600/20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full animate-pulse rounded-full blur-3xl delay-1000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 p-3 backdrop-blur-sm">
            <FileText className="h-8 w-8 text-emerald-300" />
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-200 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
            Terms & Conditions
          </h1>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-300">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Last updated: July 1, 2025
            </span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            These terms govern your use of our website and services. Please read
            them carefully.
          </p>
        </div>

        {/* Company Information Card */}
        <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 p-3">
              <Users className="h-6 w-6 text-emerald-300" />
            </div>
            <div className="flex-1">
              <h3 className="mb-4 text-2xl font-bold text-white">
                About This Agreement
              </h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  For the purpose of these Terms and Conditions,{' '}
                  <span className="font-semibold text-purple-300">
                    "we", "us", "our"
                  </span>{' '}
                  refers to
                  <span className="font-semibold text-white">
                    {' '}
                    SCANINFOGA SOLUTIONS PRIVATE LIMITED
                  </span>
                  .
                </p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm">
                    <strong className="text-purple-300">
                      Registered Office:
                    </strong>
                    <br />
                    Apt 10b Flat 13, Vadod Road, Rajwadi, Bhestan
                    <br />
                    Surat, Gujarat, India - 395023
                  </p>
                </div>
                <p>
                  <span className="font-semibold text-blue-300">
                    "You", "your", "user", "visitor"
                  </span>{' '}
                  refers to any natural or legal person visiting our website
                  and/or purchasing from us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-purple-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 p-3">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-6 text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                        <p className="leading-relaxed text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-16 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-1 h-8 w-8 flex-shrink-0 text-amber-300" />
            <div>
              <h3 className="mb-4 text-2xl font-bold text-amber-200">
                Important Notice
              </h3>
              <p className="leading-relaxed text-amber-100">
                By using our website and/or purchasing from us, you acknowledge
                that you have read, understood, and agree to be bound by these
                Terms and Conditions. If you do not agree to these terms, please
                do not use our website or services.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <Scale className="h-4 w-4" />
            <span>Governed by the laws of India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
