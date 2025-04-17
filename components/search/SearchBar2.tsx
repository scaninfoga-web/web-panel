"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchBar2Props {
  onSearch: (query: string, filter: string) => void;
}

export function SearchBar2({ onSearch }: SearchBar2Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilter, setSearchFilter] = useState("username")

  const handleSearchTrigger = () => {
    onSearch(searchQuery, searchFilter)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchTrigger()
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <Select value={searchFilter} onValueChange={setSearchFilter}>
        <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-700">
          <SelectValue placeholder="Search by..." />
        </SelectTrigger>
        <SelectContent className="bg-[#0e1421]/30 backdrop-blur-xl">
          <SelectItem value="username">Username</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="phone">Phone</SelectItem>
          <SelectItem value="ip">IP Address</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder={`Search by ${searchFilter}...`}
          className="w-full bg-gray-900/50 border border-gray-700 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-500/50 transition-colors text-white placeholder:text-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <button
        onClick={handleSearchTrigger}
        className="px-4 py-2 bg-emerald-500 text-black font-medium rounded-md hover:bg-emerald-600 transition-colors"
      >
        Search
      </button>
    </div>
  )
}