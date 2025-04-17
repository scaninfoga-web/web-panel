"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type SearchType = "email" | "phone";

interface SearchBarProps {
  onSearch: (query: string, type: SearchType) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchType, setSearchType] = useState<SearchType>("phone");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const validateQuery = (value: string, type: SearchType) => {
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else {
      const phoneRegex = /^\+?[\d\s-]{8,}$/;
      return phoneRegex.test(value);
    }
  };

  const handleSearch = () => {
    if (!query) {
      setError("Please enter a search term");
      return;
    }

    if (!validateQuery(query, searchType)) {
      setError(`Invalid ${searchType} format`);
      return;
    }

    setError("");
    onSearch(query, searchType);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setSearchType("phone")}
          className={`px-4 py-2 rounded-md ${
            searchType === "phone"
              ? "bg-emerald-500 text-white"
              : "bg-[#1a1d23] text-gray-400"
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => setSearchType("email")}
          className={`px-4 py-2 rounded-md ${
            searchType === "email"
              ? "bg-emerald-500 text-white"
              : "bg-[#1a1d23] text-gray-400"
          }`}
        >
          Email
        </button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder={searchType === "email" ? "Enter email" : "Enter phone number"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError("");
          }}
          className="bg-[#1a1d23]/60 backdrop-blur-sm border-gray-700/50"
        />
        <Button
          onClick={handleSearch}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}