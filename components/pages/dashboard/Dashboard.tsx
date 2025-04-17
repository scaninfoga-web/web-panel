"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardCard, InfoText, StatusBadge } from "./components/DashboardCard";
import { SearchBar } from "@/components/search/SearchBar";
import { Contact } from "lucide-react";
import { ContactInfo } from "./components/ContactInfo";
import { EmailInfo } from "./components/EmailInfo";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Loader } from "@/components/ui/loader";

export default function PhoneMetadata() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<"email" | "phone" | null>(null);

  const handleSearch = async (query: string, type: "email" | "phone") => {
    setIsLoading(true);
    setSearchType(type);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <SearchBar onSearch={handleSearch} />
      
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchType === "phone" && <ContactInfo />}
          {searchType === "email" && <EmailInfo />}
        </>
      )}
    </div>
  );
}

