import React from 'react';
import {
  CreditCard,
  Clock,
  XCircle,
  AlertTriangle,
  Scale,
  Mail,
  Globe,
  Building2,
  RefreshCw,
  Ban,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function RefundPolicy() {
  const sections = [
    {
      icon: <XCircle className="h-5 w-5" />,
      title: 'Cancellation Policy',
      content: [
        {
          subtitle: '24-Hour Window',
          text: 'You may cancel your subscription or service request within 24 hours of purchase, provided that the service has not yet been activated, used, or delivered.',
          type: 'success',
        },
        {
          subtitle: 'Service Initiated',
          text: 'Once the service has been initiated, data accessed, or tools used, cancellations will not be accepted.',
          type: 'warning',
        },
        {
          subtitle: 'Cancellation Process',
          text: 'For cancellation requests, please email us at support@scaninfoga.com with your Order ID and reason for cancellation.',
          type: 'info',
        },
      ],
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Refund Policy',
      content: [
        {
          subtitle: 'Refund Eligibility',
          text: 'Full refunds will only be issued if the service is not delivered due to a technical fault on our part and cannot be resolved within 3 working days.',
          type: 'success',
        },
        {
          subtitle: 'User Error Exclusions',
          text: 'Refunds are not applicable for user errors, such as providing incorrect data, mobile numbers, or misuse of tools.',
          type: 'error',
        },
        {
          subtitle: 'Tool Usage Limitation',
          text: 'Refunds will not be entertained once investigative or intelligence tools have been used.',
          type: 'warning',
        },
        {
          subtitle: 'Processing Time',
          text: 'Eligible refunds will be processed within 7-10 business days to the original payment method. No cash or wallet refunds will be provided.',
          type: 'info',
        },
      ],
    },
    {
      icon: <Ban className="h-5 w-5" />,
      title: 'Non-Refundable Services',
      content: [
        {
          subtitle: 'OSINT-Based Services',
          text: 'All services related to OSINT-based mobile number intelligence, once initiated, are strictly non-refundable due to the nature of digital data access and security protocols.',
          type: 'error',
        },
      ],
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: 'Dispute Resolution',
      content: [
        {
          subtitle: 'Escalation Process',
          text: 'If you believe your request requires special attention, you may escalate the issue by writing to grievance@scaninfoga.com.',
          type: 'info',
        },
        {
          subtitle: 'Resolution Commitment',
          text: 'We aim to resolve all genuine disputes in a fair and timely manner.',
          type: 'success',
        },
      ],
    },
  ];
  const getCardStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30 text-green-100';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-100';
      case 'error':
        return 'bg-red-500/10 border-red-500/30 text-red-100';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-100';
      default:
        return 'bg-white/5 border-white/10 text-slate-300';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-300" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-300" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-300" />;
      case 'info':
        return <AlertCircle className="h-4 w-4 text-blue-300" />;
      default:
        return (
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 p-3 backdrop-blur-sm">
            <RefreshCw className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
            Refund Policy
          </h1>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-300">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              Effective Date: July 1, 2025
            </span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            We value your trust in our products and services. Learn about our
            cancellation and refund terms.
          </p>
        </div>

        {/* Company Information Card */}
        <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 p-3">
              <Building2 className="h-6 w-6 text-emerald-300" />
            </div>
            <div className="flex-1">
              <h3 className="mb-4 text-2xl font-bold text-white">
                About This Policy
              </h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  Welcome to{' '}
                  <span className="font-semibold text-emerald-300">
                    Scaninfoga Solutions Private Limited
                  </span>
                  . This policy outlines the terms under which you may cancel
                  your order or request a refund for services purchased via our
                  website.
                </p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-blue-300">
                      Website:
                    </span>{' '}
                    www.scaninfoga.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
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
                        className={`rounded-xl border p-4 ${getCardStyle(item.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          {getIcon(item.type)}
                          <div className="flex-1">
                            <h4 className="mb-2 text-lg font-semibold">
                              {item.subtitle}
                            </h4>
                            <p className="leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Policy Changes Notice */}
        <div className="mt-12 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <RefreshCw className="mt-1 h-8 w-8 flex-shrink-0 text-purple-300" />
            <div>
              <h3 className="mb-4 text-2xl font-bold text-purple-200">
                Policy Updates
              </h3>
              <p className="leading-relaxed text-purple-100">
                Scaninfoga Solutions Private Limited reserves the right to
                update or modify this policy at any time. Changes will be
                effective immediately upon posting to the website.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-8 w-8 flex-shrink-0 text-green-300" />
            <div className="flex-1">
              <h3 className="mb-6 text-2xl font-bold text-green-200">
                Contact & Support
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-300" />
                    <div>
                      <p className="font-semibold text-green-100">
                        General Support
                      </p>
                      <p className="text-sm text-green-200">
                        support@scaninfoga.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-green-300" />
                    <div>
                      <p className="font-semibold text-green-100">
                        Grievance Officer
                      </p>
                      <p className="text-sm text-green-200">
                        grievance@scaninfoga.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-300" />
                  <div>
                    <p className="font-semibold text-green-100">Website</p>
                    <p className="text-sm text-green-200">www.scaninfoga.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-8 w-8 flex-shrink-0 text-amber-300" />
            <div>
              <h3 className="mb-4 text-2xl font-bold text-amber-200">
                Important Notice
              </h3>
              <p className="leading-relaxed text-amber-100">
                Please read this policy carefully before making any purchase. By
                using our services, you acknowledge that you have read,
                understood, and agree to be bound by these cancellation and
                refund terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
