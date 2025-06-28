'use client';

import { SearchBar2 } from '@/components/search/SearchBar2';
import { Loader } from '@/components/ui/loader';
import { ContactInfo } from '../dashboard/components/ContactInfo';
import { EmailInfo } from '../dashboard/components/EmailInfo';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TermsModal from '@/components/common/TermsModal';

const searchFilterOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Username', value: 'username' },
  { label: 'Phone', value: 'phone' },
];

function CombinedDash() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<string>('');

  const handleSearch = async (query: string, searchFilter: string) => {
    setIsLoading(true);
    setSearchType(searchFilter);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
  };

  const [open, setIsOpen] = useState(false);
  const handleAgree = () => {
    toast.success('Agreed');
  };

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold">Security Dashboard</h1>
        <p className="text-gray-400">
          Monitor your security status and threats
        </p>
      </section>

      <section className="py-6">
        <SearchBar2
          onSearch={handleSearch}
          searchFilterOptions={searchFilterOptions}
          selectedFilter="email"
        />

        {isLoading ? (
          <div className="mt-8">
            <Loader />
          </div>
        ) : (
          <>
            {searchType === 'phone' && <ContactInfo />}
            {searchType === 'email' && <EmailInfo />}
          </>
        )}
      </section>
    </>
  );
}

export default CombinedDash;
