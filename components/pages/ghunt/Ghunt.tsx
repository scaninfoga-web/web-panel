'use client';
import {
  DashboardCard,
  InfoText,
  StatusBadge,
} from '../dashboard/components/DashboardCard';
import React, { useEffect } from 'react';
import { GhuntData } from '@/types/ghunt';
import Image from 'next/image';

const Ghunt: React.FC<{ accountData: GhuntData | null | undefined }> = ({
  accountData,
}) => {
  const getImageUrl = () => {
    if (
      accountData?.profile?.profilePictureUrl &&
      accountData?.profile?.profilePictureUrl.length > 2
    ) {
      return accountData?.profile?.profilePictureUrl;
    }
    return '/null.png';
  };
  return (
    <div className="space-y-4">
      <DashboardCard
        titleBig={false}
        title={`${accountData?.email.toLowerCase() || ''}`}
        icon={
          <Image
            src={getImageUrl()}
            width={40}
            height={40}
            className="mb-1 mr-2 rounded-full border border-neutral-200"
            alt="pic"
          />
        }
      >
        <InfoText label="Gaia ID" value={accountData?.profile.gaiaId || ''} />

        <InfoText
          label="Custom Cover"
          value={
            <StatusBadge
              status={accountData?.profile.hasCustomCover ? 'Yes' : 'No'}
              variant={
                accountData?.profile.hasCustomCover ? 'outline' : 'destructive'
              }
            />
          }
        />
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
        <InfoText
          label="Last Edited"
          value={accountData?.profile.lastEdited || ''}
        />

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
        <InfoText
          label="Maps Reviews"
          value={
            <StatusBadge
              status={accountData?.maps.hasReviews ? 'Yes' : 'No'}
              variant={accountData?.maps.hasReviews ? 'outline' : 'destructive'}
            />
          }
        />
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
  );
};

export default Ghunt;
