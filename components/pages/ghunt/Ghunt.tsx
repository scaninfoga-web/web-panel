'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';

import { Activity } from 'lucide-react';

import { Loader } from '@/components/ui/loader';
import axios from 'axios';
import { Mail, Users } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  DashboardCard,
  InfoText,
  StatusBadge,
} from '../dashboard/components/DashboardCard';
import { GhuntData } from '@/types/ghunt';

const Ghunt: React.FC<{ accountData: GhuntData | null }> = ({
  accountData,
}) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [searchType, setSearchType] = useState<string>('');
  // const [accountData, setAccountData] = useState<GhuntData | null>(null);

  // const handleSearch = async (query: string, searchFilter: string) => {
  //   setIsLoading(true);
  //   setSearchType(searchFilter);

  // try {
  //   const { data } = await axios.post(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ghunt/getEmailDetails`,
  //     { email: query },
  //   );
  //   setAccountData(data.responseData);
  // } catch (err) {
  //   toast.error('Something went wrong');
  // }

  //   setIsLoading(false);
  // };

  // const searchFilterOptions = [{ label: 'Email', value: 'email' }];

  // const handleSearch = (query: string, searchFilter: string) => {
  //     console.log(query, searchFilter)
  // }

  return (
    <div className="space-y-4">
      {/* <DashboardTitle
        title="GHunt"
        subTitle="Get the info you are looking for"
      />
      <SearchBar2
        searchFilterOptions={searchFilterOptions}
        selectedFilter="email"
        onSearch={handleSearch}
      /> */}

      {/* {isLoading ? (
        <div className="mt-8">
          <Loader />
        </div>
      ) : accountData ? ( */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Profile Info"
          icon={<Activity className="h-5 w-5 text-emerald-500" />}
        >
          <InfoText label="Email" value={accountData?.email || ''} />
          <InfoText label="Gaia ID" value={accountData?.profile.gaiaId || ''} />
          <InfoText
            label="User Type"
            value={accountData?.profile.userTypes[0] || ''}
          />
          <InfoText
            label="Custom Cover"
            value={
              <StatusBadge
                status={accountData?.profile.hasCustomCover ? 'Yes' : 'No'}
                variant={
                  accountData?.profile.hasCustomCover
                    ? 'outline'
                    : 'destructive'
                }
              />
            }
          />
        </DashboardCard>
        <DashboardCard
          title="Account Status"
          icon={<Users className="h-5 w-5 text-emerald-500" />}
        >
          {/* <InfoText label="Custom Profile Picture" value={accountData.responseData.profile.hasCustomProfilePicture? "Yes" : "No"} /> */}
          <InfoText
            label="Custom Profile Picture"
            value={
              <StatusBadge
                status={
                  accountData?.profile.hasCustomProfilePicture ? 'Yes' : 'No'
                }
                variant={
                  accountData?.profile.hasCustomProfilePicture
                    ? 'outline'
                    : 'destructive'
                }
              />
            }
          />
          <InfoText
            label="Enterprise User"
            value={
              <StatusBadge
                status={accountData?.googlePlus.isEnterpriseUser ? 'Yes' : 'No'}
                variant={
                  accountData?.googlePlus.isEnterpriseUser
                    ? 'outline'
                    : 'destructive'
                }
              />
            }
          />
          {/* <InfoText label="Enterprise User" value={accountData.responseData.googlePlus.isEnterpriseUser? "Yes" : "No"} /> */}
          <InfoText
            label="Last Edited"
            value={accountData?.profile.lastEdited || ''}
          />
          <InfoText
            label="Google Chat Entity"
            value={accountData?.googleChat.entityType || ''}
          />
          <InfoText
            label="Customer ID"
            value={
              accountData?.googleChat.customerId ? (
                accountData.googleChat.customerId
              ) : (
                <StatusBadge variant="destructive" status="Not Set" />
              )
            }
          />
        </DashboardCard>
        <DashboardCard
          title="Connected Services"
          icon={<Mail className="h-5 w-5 text-emerald-500" />}
        >
          {/* <InfoText label="Calendar Public" value={accountData.responseData.calendar.isPublic? "Yes" : "No"} /> */}
          <InfoText
            label="Calendar Public"
            value={
              <StatusBadge
                status={accountData?.calendar.isPublic ? 'Yes' : 'No'}
                variant={
                  accountData?.calendar.isPublic ? 'outline' : 'destructive'
                }
              />
            }
          />
          {/* <InfoText label="Calendar Events" value={accountData.responseData.calendar.hasEvents? "Yes" : "No"} /> */}
          <InfoText
            label="Calendar Events"
            value={
              <StatusBadge
                status={accountData?.calendar.hasEvents ? 'Yes' : 'No'}
                variant={
                  accountData?.calendar.hasEvents ? 'outline' : 'destructive'
                }
              />
            }
          />
          {/* <InfoText label="Maps Reviews" value={accountData.responseData.maps.hasReviews? "Yes" : "No"} /> */}
          <InfoText
            label="Maps Reviews"
            value={
              <StatusBadge
                status={accountData?.maps.hasReviews ? 'Yes' : 'No'}
                variant={
                  accountData?.maps.hasReviews ? 'outline' : 'destructive'
                }
              />
            }
          />
          {/* <InfoText label="Maps Profile" value={accountData.responseData.maps.profileUrl} /> */}
          <InfoText
            label="Maps Profile"
            value={
              <a
                href={accountData?.maps.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[200px] truncate text-emerald-500 hover:underline"
              >
                View Profile
              </a>
            }
          />
          {/* <InfoText label="Play Games Profile" value={accountData.responseData.playGames.hasProfile? "Yes" : "No"} /> */}
          <InfoText
            label="Play Games Profile"
            value={
              <StatusBadge
                status={accountData?.playGames.hasProfile ? 'Yes' : 'No'}
                variant={
                  accountData?.playGames.hasProfile ? 'outline' : 'destructive'
                }
              />
            }
          />
          {/* <InfoText label="Games Username" value={accountData.responseData.playGames.username || "Not Set"}  */}
          <InfoText
            label="Games Username"
            value={
              accountData?.playGames.username || (
                <StatusBadge variant="destructive" status="Not Set" />
              )
            }
          />
          {/* <InfoText label="Player ID" value={accountData.responseData.playGames.playerId || "Not Set"} /> */}
          <InfoText
            label="Player ID"
            value={
              accountData?.playGames.playerId || (
                <StatusBadge variant="destructive" status="Not Set" />
              )
            }
          />
          {/* <InfoText label="Avatar URL" value={accountData.responseData.playGames.avatarUrl || "Not Set"} /> */}
          <InfoText
            label="Avatar URL"
            value={
              accountData?.playGames.avatarUrl || (
                <StatusBadge variant="destructive" status="Not Set" />
              )
            }
          />
        </DashboardCard>
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default Ghunt;
