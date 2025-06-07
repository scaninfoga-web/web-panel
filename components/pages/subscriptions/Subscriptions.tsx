// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Shield, Award, Diamond, Check, Zap, Star } from "lucide-react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// const plans = [
//   {
//     name: "Silver",
//     basePrice: 50000,
//     gst: 0.18,
//     credits: 500,
//     icon: <Shield size={48} className="text-slate-300" />,
//     description: "Perfect for startups and small teams ready to scale",
//     features: [
//       "Basic security scanning",
//       "Monthly reports",
//       "Email support",
//       "Standard API access"
//     ],
//     color: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700",
//     borderGlow: "shadow-slate-500/20",
//     hoverGlow: "hover:shadow-slate-400/40",
//     textAccent: "text-slate-300",
//     buttonColor: "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700",
//     popular: false,
//   },
//   {
//     name: "Gold",
//     basePrice: 100000,
//     gst: 0.18,
//     credits: 1200,
//     icon: <Award size={48} className="text-yellow-400" />,
//     description: "Ideal for growing teams that demand excellence",
//     features: [
//       "Advanced threat detection",
//       "Real-time monitoring",
//       "Priority support",
//       "Full API access",
//       "Custom integrations"
//     ],
//     color: "bg-gradient-to-br from-yellow-900 via-orange-800 to-amber-700",
//     borderGlow: "shadow-yellow-500/30",
//     hoverGlow: "hover:shadow-yellow-400/50",
//     textAccent: "text-yellow-300",
//     buttonColor: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700",
//     popular: true,
//   },
//   {
//     name: "Platinum",
//     basePrice: 200000,
//     gst: 0.18,
//     credits: 2500,
//     icon: <Diamond size={48} className="text-blue-400" />,
//     description: "Enterprise-grade solution for industry leaders",
//     features: [
//       "AI-powered intelligence",
//       "24/7 dedicated support",
//       "White-label solutions",
//       "Unlimited API calls",
//       "Custom workflows",
//       "Enterprise SSO"
//     ],
//     color: "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700",
//     borderGlow: "shadow-blue-500/30",
//     hoverGlow: "hover:shadow-blue-400/50",
//     textAccent: "text-blue-300",
//     buttonColor: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
//     popular: false,
//   },
// ];

// // Animated counter component
// const AnimatedCounter = ({ end, duration = 2000, label }: { end: number; duration?: number; label: string }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView) {
//       let startTime: number;
//       const animate = (timestamp: number) => {
//         if (!startTime) startTime = timestamp;
//         const progress = Math.min((timestamp - startTime) / duration, 1);

//         if (end === 99.9) {
//           setCount(99.9 * progress);
//         } else {
//           setCount(Math.floor(end * progress));
//         }

//         if (progress < 1) {
//           requestAnimationFrame(animate);
//         }
//       };
//       requestAnimationFrame(animate);
//     }
//   }, [isInView, end, duration]);

//   return (
//     <div ref={ref} className="text-center">
//       <div className="text-3xl font-bold text-slate-300">
//         {end === 99.9 ? count.toFixed(1) : Math.floor(count)}{end === 99.9 ? '%' : end === 24 ? '/7' : '+'}
//       </div>
//       <div className="text-slate-400 text-sm">{label}</div>
//     </div>
//   );
// };

// export default function SubscriptionsPage() {
//   return (
//     <div className="">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Arc Reactor Badge */}
//           <motion.div
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600/20 to-blue-600/20 backdrop-blur-sm border border-teal-500/30 rounded-full px-6 py-2 mb-6 relative overflow-hidden"
//             animate={{
//               boxShadow: [
//                 "0 0 20px rgba(20, 184, 166, 0.3)",
//                 "0 0 40px rgba(59, 130, 246, 0.5)",
//                 "0 0 20px rgba(20, 184, 166, 0.3)"
//               ]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             {/* Arc reactor inner glow */}
//             <motion.div
//               className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20"
//               animate={{
//                 scale: [1, 1.1, 1],
//                 opacity: [0.3, 0.6, 0.3]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             />
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//             >
//               <Zap size={20} className="text-teal-400 relative z-10" />
//             </motion.div>
//             <span className="text-teal-300 font-medium relative z-10">Choose Your Power Level</span>
//           </motion.div>

//           <motion.h1
//             className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Subscription Plans
//           </motion.h1>
//           <motion.p
//             className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             Unlock the full potential of ScanInfoga with our comprehensive security intelligence platform.
//             Choose the plan that scales with your ambitions.
//           </motion.p>
//         </motion.div>

//         {/* Plans Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan, index) => {
//             const gstAmount = plan.basePrice * plan.gst;
//             const totalPrice = plan.basePrice + gstAmount;

//             return (
//               <motion.div
//                 key={plan.name}
//                 className="relative group"
//                 initial={{ rotateY: 180, opacity: 0 }}
//                 animate={{ rotateY: 0, opacity: 1 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: index * 0.2,
//                   type: "spring",
//                   stiffness: 100
//                 }}
//                 whileHover={{
//                   scale: 1.05,
//                   rotateY: 5,
//                   transition: { duration: 0.3 }
//                 }}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 {/* Popular Badge */}
//                 {plan.popular && (
//                   <motion.div
//                     className="absolute -top-4 inset-x-0 flex justify-center z-10"
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ duration: 0.6, delay: 0.8 }}
//                   >
//                     <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                       >
//                         <Star size={16} className="text-white" />
//                       </motion.div>
//                       MOST POPULAR
//                     </div>
//                   </motion.div>
//                 )}

//                 <Card className={`
//                   ${plan.color}
//                   backdrop-blur-xl
//                   border-0
//                   shadow-2xl
//                   ${plan.borderGlow}
//                   ${plan.hoverGlow}
//                   transition-all
//                   duration-500
//                   transform
//                   relative
//                   overflow-hidden
//                   ${plan.popular ? 'ring-2 ring-yellow-500/50' : ''}
//                 `}>
//                   {/* Animated background overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                   <CardHeader className="text-center p-8 relative z-10">
//                     <motion.div
//                       className="flex justify-center mb-6"
//                       whileHover={{
//                         scale: 1.2,
//                         rotate: 360,
//                         transition: { duration: 0.5 }
//                       }}
//                     >
//                       {plan.icon}
//                     </motion.div>
//                     <CardTitle className="text-4xl font-bold text-white mb-4">{plan.name}</CardTitle>
//                     <p className={`text-lg ${plan.textAccent} leading-relaxed`}>{plan.description}</p>
//                   </CardHeader>

//                   <CardContent className="p-8 pt-0 space-y-6 relative z-10">
//                     {/* Pricing Section */}
//                     <div className="text-center space-y-2">
//                       <div className="text-lg text-slate-300">Base Price: <span className="font-semibold">₹{plan.basePrice.toLocaleString()}</span></div>
//                       <div className="text-lg text-slate-300">GST (18%): <span className="font-semibold">₹{gstAmount.toLocaleString()}</span></div>
//                       <motion.div
//                         className="text-4xl font-bold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
//                       >
//                         ₹{totalPrice.toLocaleString()}
//                       </motion.div>
//                       <div className={`text-xl font-bold ${plan.textAccent} flex items-center justify-center gap-2`}>
//                         <Zap size={20} />
//                         {plan.credits.toLocaleString()} Credits Included
//                       </div>
//                     </div>

//                     {/* Features List */}
//                     <div className="space-y-3">
//                       <h4 className="text-white font-semibold text-lg mb-4">What's Included:</h4>
//                       {plan.features.map((feature, featureIndex) => (
//                         <motion.div
//                           key={featureIndex}
//                           className="flex items-center gap-3 text-slate-300"
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{
//                             duration: 0.5,
//                             delay: index * 0.2 + featureIndex * 0.1 + 1.2
//                           }}
//                         >
//                           <Check size={20} className="text-green-400 flex-shrink-0" />
//                           <span>{feature}</span>
//                         </motion.div>
//                       ))}
//                     </div>

//                     {/* CTA Button */}
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Button className={`
//                         w-full
//                         ${plan.buttonColor}
//                         text-white
//                         font-bold
//                         text-lg
//                         py-4
//                         shadow-lg
//                         hover:shadow-xl
//                         transition-all
//                         duration-300
//                         border-0
//                       `}>
//                         Get Started Now
//                       </Button>
//                     </motion.div>

//                     {/* Additional CTA Text */}
//                     <p className="text-center text-sm text-slate-400 mt-4">
//                       Start scanning in minutes • No setup fees • Cancel anytime
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Trust Indicators */}
//         <motion.div
//           className="text-center mt-16 space-y-4"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 1.5 }}
//         >
//           <p className="text-slate-400 text-lg">Trusted by 10,000+ security professionals worldwide</p>
//           <div className="flex justify-center items-center gap-8">
//             <AnimatedCounter end={99.9} label="Uptime" />
//             <AnimatedCounter end={24} label="Support" />
//             <AnimatedCounter end={10000} label="Happy Customers" />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Award, Diamond, Check, Zap, Star, Info } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Vortex } from '@/components/ui/vortex';
import TiltedCard from '@/components/sub/Title-cards';

const plans = [
  {
    name: 'Silver',
    basePrice: 50000,
    gst: 0.18,
    credits: 55000,
    icon: <Shield size={48} className="text-slate-300" />,
    description: 'Perfect for startups and small teams ready to scale',
    features: [
      'Basic security scanning',
      'Monthly reports',
      'Email support',
      'Standard API access',
    ],
    color: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700',
    borderGlow: 'shadow-slate-500/20',
    hoverGlow: 'hover:shadow-slate-400/40',
    textAccent: 'text-slate-300',
    buttonColor:
      'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700',
    popular: false,
  },
  {
    name: 'Gold',
    basePrice: 100000,
    gst: 0.18,
    credits: 115000,
    icon: <Award size={48} className="text-yellow-400" />,
    description: 'Ideal for growing teams that demand excellence',
    features: [
      'Advanced threat detection',
      'Real-time monitoring',
      'Priority support',
      'Full API access',
      'Custom integrations',
    ],
    color: 'bg-gradient-to-br from-yellow-900 via-orange-800 to-amber-700',
    borderGlow: 'shadow-yellow-500/30',
    hoverGlow: 'hover:shadow-yellow-400/50',
    textAccent: 'text-yellow-300',
    buttonColor:
      'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
    popular: true,
  },
  {
    name: 'Platinum',
    basePrice: 200000,
    gst: 0.18,
    credits: 240000,
    icon: <Diamond size={48} className="text-blue-400" />,
    description: 'Enterprise-grade solution for industry leaders',
    features: [
      'AI-powered intelligence',
      '24/7 dedicated support',
      'White-label solutions',
      'Unlimited API calls',
      'Custom workflows',
      'Enterprise SSO',
    ],
    color: 'bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700',
    borderGlow: 'shadow-blue-500/30',
    hoverGlow: 'hover:shadow-blue-400/50',
    textAccent: 'text-blue-300',
    buttonColor:
      'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    popular: false,
  },
];

const comparisonFeatures = [
  {
    category: 'Usage & Billing',
    features: [
      {
        name: 'Credits per Month',
        silver: '500',
        gold: '1,200',
        platinum: '2,500',
        info: 'Number of security scans you can perform monthly',
      },
      {
        name: 'Overage Rate',
        silver: '₹100/credit',
        gold: '₹80/credit',
        platinum: '₹60/credit',
        info: 'Cost per additional credit beyond your plan limit',
      },
      {
        name: 'Billing Cycle',
        silver: 'Monthly',
        gold: 'Monthly',
        platinum: 'Monthly',
        info: "How often you'll be charged for your subscription",
      },
    ],
  },
  {
    category: 'Core Features',
    features: [
      {
        name: 'Security Scanning',
        silver: true,
        gold: true,
        platinum: true,
        info: 'Basic vulnerability detection and assessment',
      },
      {
        name: 'Threat Intelligence',
        silver: true,
        gold: true,
        platinum: true,
        info: 'Advanced threat detection and analysis',
      },
      {
        name: 'Real-time Monitoring',
        silver: false,
        gold: true,
        platinum: true,
        info: 'Continuous monitoring of your security posture',
      },
      {
        name: 'AI-Powered Analysis',
        silver: false,
        gold: false,
        platinum: true,
        info: 'Machine learning enhanced security insights',
      },
      {
        name: 'Custom Workflows',
        silver: false,
        gold: false,
        platinum: true,
        info: 'Tailored security processes for your organization',
      },
    ],
  },
  {
    category: 'Integration & API',
    features: [
      {
        name: 'API Access',
        silver: 'Standard',
        gold: 'Full',
        platinum: 'Unlimited',
        info: 'Level of programmatic access to our platform',
      },
      {
        name: 'Webhook Support',
        silver: false,
        gold: true,
        platinum: true,
        info: 'Real-time notifications for security events',
      },
      {
        name: 'Third-party Integrations',
        silver: 'Basic',
        gold: 'Extended',
        platinum: 'Enterprise',
        info: 'Connect with your existing security tools',
      },
    ],
  },
  // {
  //   category: 'Support & Training',
  //   features: [
  //     {
  //       name: 'Support Channel',
  //       silver: 'Email',
  //       gold: 'Priority Email',
  //       platinum: '24/7 Dedicated',
  //       info: 'How you can reach our support team',
  //     },
  //     {
  //       name: 'Response Time',
  //       silver: '48 hours',
  //       gold: '12 hours',
  //       platinum: '1 hour',
  //       info: 'Guaranteed response time for support requests',
  //     },
  //     {
  //       name: 'Training & Onboarding',
  //       silver: 'Self-service',
  //       gold: 'Guided setup',
  //       platinum: 'White-glove',
  //       info: 'Level of assistance during implementation',
  //     },
  //   ],
  // },
];

const faqItems = [
  {
    question: 'What happens if I want more credits?',
    answer:
      "You can easily purchase additional credits at any time through your dashboard. Extra credits are charged at your plan's overage rate: ₹100/credit for Silver, ₹80/credit for Gold, and ₹60/credit for Platinum. You can also upgrade to a higher plan for better value if you consistently need more credits.",
  },
  {
    question: 'What happens to my credits if I cancel my plan?',
    answer:
      "When you cancel your subscription, you'll retain access to your remaining credits until the end of your current billing period. After that, any unused credits will expire. We recommend using all your credits before your plan expires or downloading any reports you need.",
  },
  {
    question: 'Do my credits expire?',
    answer:
      "Credits are valid for the duration of your subscription period. Monthly plans have credits that reset each month - unused credits don't roll over to the next month. However, if you upgrade your plan mid-cycle, any remaining credits will be converted to the new plan's rate.",
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! We offer a 14-day free trial with 50 credits included. No credit card required to start. You can explore all the features of your chosen plan and see how ScanInfoga fits into your security workflow before committing to a paid subscription.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Absolutely! You can cancel your subscription at any time with no cancellation fees. Your plan will remain active until the end of your current billing period, and you'll continue to have access to all features and remaining credits until then.",
  },
];

const services = [
  {
    title: 'Realtime SIM Card Monitoring',
    imageSrc: '/subscriptions/33.png',
  },
  {
    title: 'Realtime Bank Data  Monitoring',
    imageSrc: '/subscriptions/22.png',
  },
  {
    title: 'Realtime Address Tracking',
    imageSrc: '/subscriptions/33.png',
  },
  {
    title: 'Realtime Work Monitoring',
    imageSrc: '/subscriptions/22.png',
  },
  {
    title: 'Realtime Email or Gmail  Monitoring',
    imageSrc: '/subscriptions/33.png',
  },
  {
    title: 'Alternate Mobile Number Find & Monitoring',
    imageSrc: '/subscriptions/22.png',
  },
  {
    title: 'Realtime Cybercrime  Monitoring',
    imageSrc: '/subscriptions/33.png',
  },
  {
    title: 'PDF Reports',
    imageSrc: '/subscriptions/22.png',
  },
];

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2000,
  label,
}: {
  end: number;
  duration?: number;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        if (end === 99.9) {
          setCount(99.9 * progress);
        } else {
          setCount(Math.floor(end * progress));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-emerald-500">
        {end === 99.9 ? count.toFixed(1) : Math.floor(count)}
        {end === 99.9 ? '%' : end === 24 ? '/7' : '+'}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
};

export default function SubscriptionsPage() {
  return (
    <div className="overflow-hidden rounded-3xl pb-10">
      {/* Header Section */}
      <div className="mx-auto max-w-7xl">
        <Vortex
          backgroundColor="black"
          rangeRadius={1}
          rangeY={900}
          particleCount={1000}
          baseHue={100}
          className="flex h-full w-full flex-col items-center justify-center pt-10"
        >
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Arc Reactor Badge */}
            <motion.div
              className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-gradient-to-r from-teal-600/20 to-blue-600/20 px-6 py-2 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(20, 184, 166, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(20, 184, 166, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Arc reactor inner glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Zap size={20} className="relative z-10 text-teal-400" />
              </motion.div>
              <span className="relative z-10 font-medium text-teal-300">
                Choose Your Power Level
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Subscription Plans
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock the full potential of ScanInfoga with our comprehensive
              security intelligence platform. Choose the plan that scales with
              your ambitions.
            </motion.p>
          </motion.div>
        </Vortex>

        {/* Plans Grid */}
        <div className="mx-auto mb-20 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => {
            const gstAmount = plan.basePrice * plan.gst;
            const totalPrice = plan.basePrice + gstAmount;

            return (
              <motion.div
                key={plan.name}
                className="group relative"
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute inset-x-0 -top-4 z-10 flex justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2 text-sm font-bold text-white shadow-lg">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <Star size={16} className="text-white" />
                      </motion.div>
                      MOST POPULAR
                    </div>
                  </motion.div>
                )}

                <Card
                  className={` ${plan.color} border-0 shadow-2xl backdrop-blur-xl ${plan.borderGlow} ${plan.hoverGlow} relative transform overflow-hidden transition-all duration-500 ${plan.popular ? 'ring-2 ring-yellow-500/50' : ''} `}
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <CardHeader className="relative z-10 p-8 text-center">
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.5 },
                      }}
                    >
                      {plan.icon}
                    </motion.div>
                    <CardTitle className="mb-4 text-4xl font-bold text-white">
                      {plan.name}
                    </CardTitle>
                    <p className={`text-lg ${plan.textAccent} leading-relaxed`}>
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6 p-8 pt-0">
                    {/* Pricing Section */}
                    <div className="space-y-2 text-center">
                      <div className="text-lg text-slate-300">
                        Base Price:{' '}
                        <span className="font-semibold">
                          ₹{plan.basePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-lg text-slate-300">
                        GST (18%):{' '}
                        <span className="font-semibold">
                          ₹{gstAmount.toLocaleString()}
                        </span>
                      </div>
                      <motion.div
                        className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold text-transparent text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                      >
                        ₹{totalPrice.toLocaleString()}
                      </motion.div>
                      <div
                        className={`text-xl font-bold ${plan.textAccent} flex items-center justify-center gap-2`}
                      >
                        <Zap size={20} />
                        {plan.credits.toLocaleString()} Credits Included
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      <h4 className="mb-4 text-lg font-semibold text-white">
                        What's Included:
                      </h4>
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-3 text-slate-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.2 + featureIndex * 0.1 + 1.2,
                          }}
                        >
                          <Check
                            size={20}
                            className="flex-shrink-0 text-green-400"
                          />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className={`w-full ${plan.buttonColor} border-0 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
                      >
                        Get Started Now
                      </Button>
                    </motion.div>

                    {/* Additional CTA Text */}
                    <p className="mt-4 text-center text-sm text-slate-400">
                      Start scanning in minutes • No setup fees • Cancel anytime
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-bold text-transparent">
              Detailed Comparison
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-400">
              Compare all features across our plans to find the perfect fit for
              your security needs
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 border-b border-slate-700/50 bg-slate-800/50 p-6">
              <div></div>
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-300">
                  Silver
                </h3>
                <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-2 text-sm text-white hover:from-teal-700 hover:to-cyan-700">
                  Get Started
                </Button>
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-yellow-300">Gold</h3>
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-2 text-sm text-white hover:from-orange-700 hover:to-red-700">
                  Get Started
                </Button>
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-blue-300">
                  Platinum
                </h3>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm text-white hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Table Content */}
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="bg-slate-800/30 px-6 py-4">
                  <h4 className="text-lg font-semibold text-white">
                    {category.category}
                  </h4>
                </div>
                {category.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="grid grid-cols-4 gap-4 border-b border-slate-700/30 p-4 transition-colors hover:bg-slate-800/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-300">
                        {feature.name}
                      </span>
                      <div className="group relative">
                        <Info
                          size={14}
                          className="cursor-help text-slate-500"
                        />
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 transform rounded-lg bg-slate-800 px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                          {feature.info}
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-slate-300">
                      {typeof feature.silver === 'boolean' ? (
                        feature.silver ? (
                          <Check size={20} className="mx-auto text-green-400" />
                        ) : (
                          <span className="text-slate-500">-</span>
                        )
                      ) : (
                        feature.silver
                      )}
                    </div>
                    <div className="text-center text-slate-300">
                      {typeof feature.gold === 'boolean' ? (
                        feature.gold ? (
                          <Check size={20} className="mx-auto text-green-400" />
                        ) : (
                          <span className="text-slate-500">-</span>
                        )
                      ) : (
                        feature.gold
                      )}
                    </div>
                    <div className="text-center text-slate-300">
                      {typeof feature.platinum === 'boolean' ? (
                        feature.platinum ? (
                          <Check size={20} className="mx-auto text-green-400" />
                        ) : (
                          <span className="text-slate-500">-</span>
                        )
                      ) : (
                        feature.platinum
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <h1 className="mb-6 pl-1 text-3xl font-semibold">Services</h1>
        <motion.div
          className="mb-10 grid grid-cols-3 gap-4 py-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {services.map((service, index) => (
            <TiltedCard
              key={index}
              imageSrc={service.imageSrc}
              altText={service.title}
              captionText={service.title}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="rounded-3xl bg-black/70 px-3 py-1 text-center font-semibold">
                  {service.title}
                </p>
              }
            />
          ))}
        </motion.div>
        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-4xl font-bold text-white">Questions?</h2>
            <p className="text-2xl text-slate-400">Answers.</p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
                >
                  <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                    <span className="text-lg font-medium text-white">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 leading-relaxed text-slate-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              More Questions?
            </h3>
            <p className="mb-6 text-slate-400">
              Contact our support team for further assistance.
            </p>
            <Button className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-3 text-white hover:from-teal-700 hover:to-blue-700">
              Contact Support
            </Button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p className="text-lg text-slate-400">
            Trusted by 10,000+ security professionals worldwide
          </p>
          <div className="flex items-center justify-center gap-8">
            <AnimatedCounter end={99.9} label="Uptime" />
            <AnimatedCounter end={24} label="Support" />
            <AnimatedCounter end={10000} label="Happy Customers" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
