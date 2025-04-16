"use client"

import { ArrowRight, BarChart3, Lock, Shield, Users, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navbar from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

// Add these interfaces before the Dashboard component
interface CardItem {
  label: string;
  value: string;
  highlighted?: boolean;
}

interface DetailCard {
  title: string;
  description: string;
  delay: number;
  data: CardItem[];
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilter, setSearchFilter] = useState("username")

  // Add type annotation to detailCards
  const detailCards: DetailCard[] = [
    {
      title: "Financial Details",
      description: "Transaction and payment information",
      delay: 0.6,
      data: [
        { label: "Account Type", value: "Premium" },
        { label: "Last Payment", value: "$299.99" },
        { label: "Next Billing", value: "Dec 1, 2023" },
        { label: "Payment Method", value: "VISA ****4242" },
      ],
    },
    {
      title: "Location Details",
      description: "Address and geographical information",
      delay: 0.7,
      data: [
        { label: "Country", value: "United States" },
        { label: "City", value: "New York" },
        { label: "IP Address", value: "192.168.1.1" },
        { label: "Time Zone", value: "EST (UTC-5)" },
      ],
    },
    {
      title: "Social Media Profiles",
      description: "Connected social accounts",
      delay: 0.8,
      data: [
        { label: "Twitter", value: "@username", highlighted: true },
        { label: "LinkedIn", value: "/in/profile", highlighted: true },
        { label: "GitHub", value: "@devuser", highlighted: true },
        { label: "Discord", value: "user#1234", highlighted: true },
      ],
    },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement your search logic here based on searchFilter
    console.log(`Searching for ${query} in ${searchFilter}`)
  }

  return (
        <div className="container mt-12 mx-auto px-4 py-8">
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Security Dashboard</h1>
                <p className="text-gray-400">Monitor your security status and threats</p>
              </div>
              {/* <Select defaultValue="today">
                <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-700">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder={`Search by ${searchFilter}...`}
                  className="w-full bg-gray-900/50 border border-gray-700 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-500/50 transition-colors text-white placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Select value={searchFilter} onValueChange={setSearchFilter}>
                <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-700">
                  <SelectValue placeholder="Search by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="username">Username</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="ip">IP Address</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detailCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: card.delay }}
              >
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-gray-800">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-gray-800">
                          {card.data.map((item) => (
                            <tr key={item.label} className="hover:bg-gray-800/50">
                              <td className="px-4 py-2 text-gray-400">{item.label}</td>
                              <td className={`px-4 py-2 text-right ${item.highlighted ? 'text-emerald-500' : ''}`}>
                                {item.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
  )
}
