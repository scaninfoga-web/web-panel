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
import { Button } from '../ui/button';

interface SearchBar2Props {
  onSearch: (query: string, filter: string) => void;
  selectedFilter?: string; // Add this prop to receive the selected search filter from the parent component
  searchFilterOptions?: Array<{ label: string; value: string }>;
  showOptions?: boolean; // Add this prop to control the visibility of the search filter options
  defaultFilter?: string;
  defaultQuery?: string;
}

export function SearchBar2({
  onSearch,
  selectedFilter,
  searchFilterOptions,
  showOptions,
  defaultFilter,
  defaultQuery,
}: SearchBar2Props) {
  const [searchQuery, setSearchQuery] = useState(defaultQuery || '');
  const [searchFilter, setSearchFilter] = useState(
    defaultFilter || selectedFilter || 'username',
  );

  const handleSearchTrigger = () => {
    onSearch(searchQuery, searchFilter);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchTrigger();
    }
  };

  return (
    <div className="flex flex-col gap-y-2 md:grid md:grid-cols-12 md:gap-x-4 md:gap-y-0">
      <div className="md:col-span-2 md:h-full">
        <Select value={searchFilter} onValueChange={setSearchFilter}>
          <SelectTrigger className="border-gray-700 bg-gray-900/50">
            <SelectValue placeholder="Search by..." />
          </SelectTrigger>
          <SelectContent className="bg-[#0e1421]/30 backdrop-blur-xl hover:cursor-pointer">
            {searchFilterOptions?.map((option, index) => {
              return (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
            {/* <SelectItem value="username">Username</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="phone">Phone</SelectItem>
          <SelectItem value="ip">IP Address</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <div className="relative col-span-8">
        <Search className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder={`Search by ${searchFilter}...`}
          className="w-full rounded-md border border-gray-700 bg-gray-900/50 py-2 pl-10 pr-4 text-white transition-colors placeholder:text-gray-500 hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <Button
        onClick={handleSearchTrigger}
        className="col-span-2 rounded-none"
        // className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black transition-colors hover:bg-emerald-600"
      >
        Search
      </Button>
    </div>
  );
}
