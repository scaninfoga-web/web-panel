import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  Users,
  Cookie,
  Globe,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Database,
  UserCheck,
} from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'Name, mobile number, email, address, KYC details, Aadhaar/PAN (where required).',
        },
        {
          subtitle: 'Device and Technical Data',
          text: 'IP address, browser type, device ID, cookies, usage logs.',
        },
        {
          subtitle: 'Service Data',
          text: 'Mobile numbers or identifiers searched via our OSINT-based intelligence tools.',
        },
      ],
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Provision',
          text: 'To provide and improve our services with enhanced functionality.',
        },
        {
          subtitle: 'Legal Compliance',
          text: 'For compliance with legal and regulatory obligations and lawful data analysis.',
        },
        {
          subtitle: 'Security & Support',
          text: 'For customer support, technical troubleshooting, user authentication and fraud prevention.',
        },
      ],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Data Protection & Customer Information',
      content: [
        {
          subtitle: 'Informed Consent',
          text: 'All customer data is collected with informed consent. We never sell or rent your data to third parties.',
        },
        {
          subtitle: 'Confidentiality',
          text: 'Data shared with us for investigative or verification purposes is kept confidential and used solely for intended legal purposes.',
        },
        {
          subtitle: 'User Activity Monitoring',
          text: 'We monitor and log user activity including time of access, queries made, and actions performed for security and audit purposes.',
        },
      ],
    },
    {
      icon: <Cookie className="h-5 w-5" />,
      title: 'Cookies & Technology',
      content: [
        {
          subtitle: 'Cookie Usage',
          text: 'We use cookies to improve user experience, remember preferences, and analyze usage trends.',
        },
        {
          subtitle: 'User Control',
          text: 'Users can control cookie usage through browser settings, although disabling cookies may limit certain functionalities.',
        },
      ],
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'Data Transfer & External Links',
      content: [
        {
          subtitle: 'International Transfers',
          text: 'Your data may be stored and processed outside India where our cloud infrastructure or third-party providers reside with appropriate security measures.',
        },
        {
          subtitle: 'Third-Party Sites',
          text: 'Our website may contain links to external websites. We are not responsible for their content, privacy policies, or data practices.',
        },
      ],
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: 'Your Rights & Access',
      content: [
        {
          subtitle: 'Data Access',
          text: 'Request access to your personal data and request correction or deletion.',
        },
        {
          subtitle: 'Consent Management',
          text: 'Withdraw consent (subject to legal limitations) by contacting our Grievance Officer.',
        },
      ],
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Security Measures',
      content: [
        {
          subtitle: 'Protection Standards',
          text: 'We adopt industry-standard security practices including data encryption, access control, secure servers, and regular security audits.',
        },
        {
          subtitle: 'User Responsibility',
          text: 'No online system is completely secure. Users are advised to protect their login credentials.',
        },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-purple-500/30 bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 p-3 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-emerald-300" />
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-200 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
            Privacy Policy
          </h1>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-300">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              Effective Date: July 1, 2025
            </span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            Your privacy is our top priority. Learn how we collect, use, and
            protect your information.
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
                About Scaninfoga Solutions
              </h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  <span className="font-semibold text-purple-300">
                    Company:
                  </span>
                  <span className="font-semibold text-white">
                    {' '}
                    Scaninfoga Solutions Private Limited
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-blue-300">Website:</span>
                  <span className="text-white"> www.scaninfoga.com</span>
                </p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm">
                    We are committed to protecting your data in accordance with
                    applicable Indian laws, including the
                    <span className="text-purple-300">
                      {' '}
                      Information Technology Act, 2000
                    </span>{' '}
                    and global standards where applicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
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
                      <div
                        key={itemIndex}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                      >
                        <h4 className="mb-2 text-lg font-semibold text-purple-300">
                          {item.subtitle}
                        </h4>
                        <p className="leading-relaxed text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enforcement Notice */}
        <div className="mt-12 rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <Eye className="mt-1 h-8 w-8 flex-shrink-0 text-orange-300" />
            <div>
              <h3 className="mb-4 text-2xl font-bold text-orange-200">
                Enforcement
              </h3>
              <p className="leading-relaxed text-orange-100">
                We reserve the right to investigate and take appropriate action,
                including reporting to law enforcement, against users who misuse
                the platform or violate our terms, privacy, or applicable laws.
              </p>
            </div>
          </div>
        </div>

        {/* Grievance Officer Contact */}
        <div className="mt-12 rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <Phone className="mt-1 h-8 w-8 flex-shrink-0 text-green-300" />
            <div className="flex-1">
              <h3 className="mb-6 text-2xl font-bold text-green-200">
                Grievance Officer Contact
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-300" />
                    <span className="text-green-100">
                      support@scaninfoga.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-300" />
                    <span className="text-green-100">+91-7622004401</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-green-300" />
                  <div className="text-sm text-green-100">
                    Apt 10b Flat 13, Vadod Road, Rajwadi, Bhestan
                    <br />
                    Surat, Gujarat, India - 395023
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-green-200">
                  <strong>Response Time:</strong> We acknowledge complaints
                  within 72 hours and resolve them typically within 15 business
                  days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-1 h-8 w-8 flex-shrink-0 text-amber-300" />
            <div>
              <h3 className="mb-4 text-2xl font-bold text-amber-200">
                Legal Framework
              </h3>
              <div className="space-y-3 text-amber-100">
                <p>
                  This Privacy Policy is governed by and construed in accordance
                  with the laws of India. Any disputes shall be subject to the
                  exclusive jurisdiction of the courts of Odisha, India.
                </p>
                <p>
                  We may revise this Privacy Policy periodically. Changes will
                  be posted on this page with an updated date. Continued use of
                  the website after such changes constitutes acceptance of the
                  updated terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
