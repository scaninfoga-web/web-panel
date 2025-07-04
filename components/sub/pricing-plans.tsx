'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Basic',
    price: { monthly: 0, yearly: 0 },
    description: 'Essential security features for small projects',
    features: [
      'Basic vulnerability scanning',
      'Security awareness training',
      'Community support',
      'Basic threat detection',
      'Up to 3 projects',
    ],
    popular: false,
    buttonText: 'Get Started',
  },
  {
    name: 'Professional',
    price: { monthly: 49.99, yearly: 499.99 },
    description: 'Advanced security for growing businesses',
    features: [
      'Advanced vulnerability assessment',
      '24/7 security monitoring',
      'Priority support',
      'Custom security policies',
      'Up to 10 projects',
      'API access',
      'Security dashboard',
      'Compliance reporting',
    ],
    popular: true,
    buttonText: 'Start Pro',
  },
  {
    name: 'Enterprise',
    price: { monthly: 99.99, yearly: 999.99 },
    description: 'Complete security solution for large organizations',
    features: [
      'Everything in Professional',
      'Custom deployment',
      'Dedicated security team',
      'Advanced AI threat detection',
      'Unlimited projects',
      '24/7 emergency response',
      'Custom integrations',
      'Executive reporting',
    ],
    popular: false,
    buttonText: 'Contact Sales',
  },
];

export default function PricingPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Choose Your <span className="text-emerald-500">Security</span> Plan
          </h1>
          <p className="mb-8 text-lg text-white/70">
            Protect your digital assets with our comprehensive security
            solutions
          </p>

          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!annual ? 'text-emerald-500' : 'text-white/70'}`}
            >
              Monthly
            </span>
            <Switch
              id="billing-toggle"
              checked={annual}
              onCheckedChange={(checked) => setAnnual(checked)}
              className="data-[state=checked]:bg-emerald-500"
            />
            <span
              className={`text-sm font-medium ${annual ? 'text-emerald-500' : 'text-white/70'}`}
            >
              Annual{' '}
              <Badge
                variant="outline"
                className="ml-1.5 border-emerald-500 text-emerald-500"
              >
                Save 20%
              </Badge>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative border-gray-800 bg-gray-900/50 transition-all duration-300 hover:border-emerald-500/50">
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-emerald-500 text-black hover:bg-emerald-600">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ₹{annual ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="ml-2 text-white/70">
                      {annual ? '/year' : '/month'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? 'bg-emerald-500 text-black hover:bg-emerald-600' : 'border-emerald-500/30 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-300'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
            <AlertCircle className="h-5 w-5 text-emerald-500" />
            <p className="text-white/70">
              Need a custom plan?{' '}
              <Button
                variant="link"
                className="p-0 text-emerald-400 hover:text-emerald-300"
              >
                Contact our sales team
              </Button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
