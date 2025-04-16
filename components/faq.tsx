"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is ScanInfoga and what services do you offer?",
    answer:
      "ScanInfoga is a cybersecurity company specializing in vulnerability assessment, penetration testing, secure code review, and security training. We offer comprehensive security solutions to protect your digital assets from evolving cyber threats.",
  },
  {
    question: "How can I enroll in your cybersecurity courses?",
    answer:
      "You can enroll in our cybersecurity courses by creating an account on our platform and selecting the course that best fits your needs. We offer both beginner and advanced courses with flexible learning options.",
  },
  {
    question: "What is M-I-S-H and how does it work?",
    answer:
      "M-I-S-H (Multi-Integrated Security Hub) is our proprietary security framework that combines multiple security tools and methodologies into a single, comprehensive solution. It provides real-time monitoring, threat detection, and automated response capabilities.",
  },
  {
    question: "Do you offer cloud security solutions?",
    answer:
      "Yes, we provide comprehensive cloud security solutions through our Cloud Terminal service. This includes cloud infrastructure assessment, security configuration review, and continuous monitoring for AWS, Azure, and Google Cloud environments.",
  },
  {
    question: "What types of organizations do you typically work with?",
    answer:
      "We work with organizations of all sizes across various industries, including finance, healthcare, e-commerce, and government. Our solutions are scalable and can be tailored to meet the specific security needs of any organization.",
  },
  {
    question: "How do I access the Digital E-Book resources?",
    answer:
      "After purchasing access to our Digital E-Book collection, you can access all resources through your account dashboard. Our e-books cover various cybersecurity topics and are regularly updated with the latest information and techniques.",
  },
  {
    question: "What makes ScanInfoga different from other cybersecurity companies?",
    answer:
      "ScanInfoga combines cutting-edge technology with expert knowledge to provide comprehensive security solutions. Our approach focuses on education alongside protection, ensuring that our clients not only have secure systems but also understand how to maintain them.",
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h2>
          <p className="text-lg text-white/70">
            Find answers to common questions about our cybersecurity services and solutions
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 transition-all text-left">
                    <span className="font-medium text-white">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-white/70">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 mb-4">Still have questions? We're here to help.</p>
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer">
            Contact our support team
          </div>
        </motion.div>
      </div>
    </section>
  )
}
