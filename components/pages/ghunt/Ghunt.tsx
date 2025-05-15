'use client';
import Dashboard from '@/app/dashboard/page';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';

import {
  Shield,
  Share2,
  Key,
  Globe,
  Activity,
  AlertTriangle,
  LineChart,
  PieChart as PieChartIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, MapPin, User2, Users } from 'lucide-react';
import { Loader } from '@/components/ui/loader';
import { useState } from 'react';
import {
  DashboardCard,
  InfoText,
  StatusBadge,
} from '../dashboard/components/DashboardCard';
import axios from 'axios';

interface GoogleAccountData {
  //   responseStatus: {
  //     status: boolean;
  //     message: string;
  //   };
  //   responseData: {
  success: boolean;
  email: string;
  profile: {
    gaiaId: string;
    hasCustomProfilePicture: boolean;
    hasCustomCover: boolean;
    lastEdited: string;
    userTypes: string[];
  };
  googleChat: {
    entityType: string;
    customerId: null;
  };
  googlePlus: {
    isEnterpriseUser: boolean;
  };
  playGames: {
    hasProfile: boolean;
    username: null;
    playerId: null;
    avatarUrl: null;
  };
  maps: {
    profileUrl: string;
    hasReviews: boolean;
  };
  calendar: {
    isPublic: boolean;
    hasEvents: boolean;
  };
  //   };
}

export default function Ghunt() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<string>('');
  const [accountData, setAccountData] = useState<GoogleAccountData | null>(
    null,
  );

  const handleSearch = async (query: string, searchFilter: string) => {
    setIsLoading(true);
    setSearchType(searchFilter);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ghunt/getEmailDetails`,
        { email: query },
      );
      console.log('Respnse:', data.responseData);
      setAccountData(data.responseData);
    } catch (err) {
      alert('ERROR');
    }

    // Simulate API response
    const dummyData: GoogleAccountData = {
      // responseStatus: {
      //   status: true,
      //   message: "Email information retrieved successfully"
      // },
      // responseData: {
      success: true,
      email: 'abhinavsrivastav699@gmail.com',
      profile: {
        gaiaId: '108505126673801701156',
        hasCustomProfilePicture: false,
        hasCustomCover: false,
        lastEdited: '2025/05/14 10:32:32 (UTC)',
        userTypes: ['GOOGLE_USER'],
      },
      googleChat: {
        entityType: 'PERSON',
        customerId: null,
      },
      googlePlus: {
        isEnterpriseUser: false,
      },
      playGames: {
        hasProfile: false,
        username: null,
        playerId: null,
        avatarUrl: null,
      },
      maps: {
        profileUrl:
          'https://www.google.com/maps/contrib/108505126673801701156/reviews',
        hasReviews: false,
      },
      calendar: {
        isPublic: true,
        hasEvents: false,
      },
      // }
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAccountData(dummyData);
    setIsLoading(false);
  };

  const searchFilterOptions = [{ label: 'Email', value: 'email' }];

  // const handleSearch = (query: string, searchFilter: string) => {
  //     console.log(query, searchFilter)
  // }

  return (
    <div className="space-y-4">
      <DashboardTitle
        title="GHunt"
        subTitle="Get the info you are looking for"
      />
      <SearchBar2
        searchFilterOptions={searchFilterOptions}
        selectedFilter="email"
        onSearch={handleSearch}
      />

      {isLoading ? (
        <div className="mt-8">
          <Loader />
        </div>
      ) : accountData ? (
        //   <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        //     <Card className="border-gray-800 bg-gray-900/50">
        //       <CardHeader className="flex flex-row items-center justify-between pb-2">
        //         <CardTitle className="text-sm font-medium text-emerald-500">Profile Info</CardTitle>
        //         <User2 className="h-4 w-4 text-emerald-500" />
        //       </CardHeader>
        //       <CardContent className="space-y-2">
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Email</span>
        //           <span>{accountData.responseData.email}</span>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Gaia ID</span>
        //           <span>{accountData.responseData.profile.gaiaId}</span>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">User Type</span>
        //           <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
        //             {accountData.responseData.profile.userTypes[0]}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Custom Cover</span>
        //           <Badge variant="outline" className={accountData.responseData.profile.hasCustomCover ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.profile.hasCustomCover ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //       </CardContent>
        //     </Card>

        //     <Card className="border-gray-800 bg-gray-900/50">
        //       <CardHeader className="flex flex-row items-center justify-between pb-2">
        //         <CardTitle className="text-sm font-medium text-emerald-500">Account Status</CardTitle>
        //         <Users className="h-4 w-4 text-emerald-500" />
        //       </CardHeader>
        //       <CardContent className="space-y-2">
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Custom Profile Picture</span>
        //           <Badge variant="outline" className={accountData.responseData.profile.hasCustomProfilePicture ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.profile.hasCustomProfilePicture ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Enterprise User</span>
        //           <Badge variant="outline" className={accountData.responseData.googlePlus.isEnterpriseUser ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.googlePlus.isEnterpriseUser ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Last Edited</span>
        //           <span>{accountData.responseData.profile.lastEdited}</span>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Google Chat Entity</span>
        //           <span>{accountData.responseData.googleChat.entityType}</span>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Customer ID</span>
        //           <span>{accountData.responseData.googleChat.customerId || "Not Set"}</span>
        //         </div>
        //       </CardContent>
        //     </Card>

        //     <Card className="border-gray-800 bg-gray-900/50">
        //       <CardHeader className="flex flex-row items-center justify-between pb-2">
        //         <CardTitle className="text-sm font-medium text-emerald-500">Connected Services</CardTitle>
        //         <Mail className="h-4 w-4 text-emerald-500" />
        //       </CardHeader>
        //       <CardContent className="space-y-2">
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Calendar Public</span>
        //           <Badge variant="outline" className={accountData.responseData.calendar.isPublic ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.calendar.isPublic ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Calendar Events</span>
        //           <Badge variant="outline" className={accountData.responseData.calendar.hasEvents ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.calendar.hasEvents ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Maps Reviews</span>
        //           <Badge variant="outline" className={accountData.responseData.maps.hasReviews ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.maps.hasReviews ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Maps Profile</span>
        //           <a href={accountData.responseData.maps.profileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline truncate max-w-[200px]">
        //             View Profile
        //           </a>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Play Games Profile</span>
        //           <Badge variant="outline" className={accountData.responseData.playGames.hasProfile ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}>
        //             {accountData.responseData.playGames.hasProfile ? "Yes" : "No"}
        //           </Badge>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Games Username</span>
        //           <span>{accountData.responseData.playGames.username || "Not Set"}</span>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Player ID</span>
        //           <span>{accountData.responseData.playGames.playerId || "Not Set"}</span>
        //         </div>
        //         <div className="flex justify-between">
        //           <span className="text-gray-400">Avatar URL</span>
        //           <span>{accountData.responseData.playGames.avatarUrl || "Not Set"}</span>
        //         </div>
        //       </CardContent>
        //     </Card>
        //   </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Profile Info"
            icon={<Activity className="h-5 w-5 text-emerald-500" />}
          >
            <InfoText label="Email" value={accountData.email} />
            <InfoText label="Gaia ID" value={accountData.profile.gaiaId} />
            <InfoText
              label="User Type"
              value={accountData.profile.userTypes[0]}
            />
            <InfoText
              label="Custom Cover"
              value={
                <StatusBadge
                  status={accountData.profile.hasCustomCover ? 'Yes' : 'No'}
                  variant={
                    accountData.profile.hasCustomCover
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
                    accountData.profile.hasCustomProfilePicture ? 'Yes' : 'No'
                  }
                  variant={
                    accountData.profile.hasCustomProfilePicture
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
                  status={
                    accountData.googlePlus.isEnterpriseUser ? 'Yes' : 'No'
                  }
                  variant={
                    accountData.googlePlus.isEnterpriseUser
                      ? 'outline'
                      : 'destructive'
                  }
                />
              }
            />
            {/* <InfoText label="Enterprise User" value={accountData.responseData.googlePlus.isEnterpriseUser? "Yes" : "No"} /> */}
            <InfoText
              label="Last Edited"
              value={accountData.profile.lastEdited}
            />
            <InfoText
              label="Google Chat Entity"
              value={accountData.googleChat.entityType}
            />
            <InfoText
              label="Customer ID"
              value={
                accountData.googleChat.customerId ? (
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
                  status={accountData.calendar.isPublic ? 'Yes' : 'No'}
                  variant={
                    accountData.calendar.isPublic ? 'outline' : 'destructive'
                  }
                />
              }
            />
            {/* <InfoText label="Calendar Events" value={accountData.responseData.calendar.hasEvents? "Yes" : "No"} /> */}
            <InfoText
              label="Calendar Events"
              value={
                <StatusBadge
                  status={accountData.calendar.hasEvents ? 'Yes' : 'No'}
                  variant={
                    accountData.calendar.hasEvents ? 'outline' : 'destructive'
                  }
                />
              }
            />
            {/* <InfoText label="Maps Reviews" value={accountData.responseData.maps.hasReviews? "Yes" : "No"} /> */}
            <InfoText
              label="Maps Reviews"
              value={
                <StatusBadge
                  status={accountData.maps.hasReviews ? 'Yes' : 'No'}
                  variant={
                    accountData.maps.hasReviews ? 'outline' : 'destructive'
                  }
                />
              }
            />
            {/* <InfoText label="Maps Profile" value={accountData.responseData.maps.profileUrl} /> */}
            <InfoText
              label="Maps Profile"
              value={
                <a
                  href={accountData.maps.profileUrl}
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
                  status={accountData.playGames.hasProfile ? 'Yes' : 'No'}
                  variant={
                    accountData.playGames.hasProfile ? 'outline' : 'destructive'
                  }
                />
              }
            />
            {/* <InfoText label="Games Username" value={accountData.responseData.playGames.username || "Not Set"}  */}
            <InfoText
              label="Games Username"
              value={
                accountData.playGames.username || (
                  <StatusBadge variant="destructive" status="Not Set" />
                )
              }
            />
            {/* <InfoText label="Player ID" value={accountData.responseData.playGames.playerId || "Not Set"} /> */}
            <InfoText
              label="Player ID"
              value={
                accountData.playGames.playerId || (
                  <StatusBadge variant="destructive" status="Not Set" />
                )
              }
            />
            {/* <InfoText label="Avatar URL" value={accountData.responseData.playGames.avatarUrl || "Not Set"} /> */}
            <InfoText
              label="Avatar URL"
              value={
                accountData.playGames.avatarUrl || (
                  <StatusBadge variant="destructive" status="Not Set" />
                )
              }
            />
          </DashboardCard>
        </div>
      ) : null}
    </div>
  );
}
