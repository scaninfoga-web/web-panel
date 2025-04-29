'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBar2Props {
  onSearch: (query: string, filter: string) => void;
}

export function SearchBar2({ onSearch }: SearchBar2Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('username');

  const handleSearchTrigger = () => {
    onSearch(searchQuery, searchFilter);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchTrigger();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Select value={searchFilter} onValueChange={setSearchFilter}>
        <SelectTrigger className="w-[150px] border-gray-700 bg-gray-900/50">
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
          className="w-full rounded-md border border-gray-700 bg-gray-900/50 py-2 pl-10 pr-4 text-white transition-colors placeholder:text-gray-500 hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <button
        onClick={handleSearchTrigger}
        className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black transition-colors hover:bg-emerald-600"
      >
        Search
      </button>
    </div>
  );
}
