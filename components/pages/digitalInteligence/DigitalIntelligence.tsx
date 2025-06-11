'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  IconBusinessplan,
  IconDeviceSim,
  IconDevicesSearch,
  IconFileSearch,
  IconMailSearch,
  IconUserSearch,
} from '@tabler/icons-react';
import { BadgeIndianRupee } from 'lucide-react';

import React, { useState } from 'react';

const tools = [
  {
    toolName: 'Username Trace',
    icon: IconUserSearch,
    subTools: [
      {
        toolName: 'Username 365 Intelligence',
      },
      {
        toolName: 'Social Media Trace',
      },
      {
        toolName: 'Google Docking',
      },
      {
        toolName: 'Breach Info Trace',
      },
    ],
  },
  {
    toolName: 'Number Trace',
    icon: IconDeviceSim,
    subTools: [
      {
        toolName: 'Mobile 365 Intelligence',
      },
      {
        toolName: 'Mobile to Employee Info',
      },
      {
        toolName: 'Mobile to Doc & Address Find',
      },
      {
        toolName: 'Mobile to DL',
      },
      {
        toolName: 'Mobile to Email',
      },
      {
        toolName: 'Mobile to Breach Info',
      },
      {
        toolName: 'Mobile to Gas Info',
      },
    ],
  },
  {
    toolName: 'Financial Trace',
    icon: BadgeIndianRupee,
    subTools: [
      {
        toolName: 'Financial 365 Intelligence',
      },
      {
        toolName: 'Mobile to Bank Info',
      },
      {
        toolName: 'Reverse Account Number',
      },
      {
        toolName: 'Mobile to Multi UPI Info',
      },
      {
        toolName: 'Mobile to Loan Trace',
      },
    ],
  },
  {
    toolName: 'IP Investigation',
    icon: IconDevicesSearch,
    subTools: [
      {
        toolName: 'IP 365 Intelligence',
      },
      {
        toolName: 'IP Address Info',
      },
      {
        toolName: 'Reverse IP Address',
      },
      {
        toolName: 'IP to Device Detect',
      },
      {
        toolName: 'IP to Breach Info',
      },
    ],
  },
  {
    toolName: 'Business Track',
    icon: IconBusinessplan,
    subTools: [
      {
        toolName: 'GST Info Trace',
      },
      {
        toolName: 'Udyam Verify Info Trace',
      },
    ],
  },
  {
    toolName: 'Email Investigation',
    icon: IconMailSearch,
    subTools: [
      {
        toolName: 'Email 365 Intelligence',
      },
      {
        toolName: 'Google Profile',
      },
      {
        toolName: 'Google Docking',
      },
      {
        toolName: 'Email to Device Track',
      },
      {
        toolName: 'Email to IP Address',
      },
      {
        toolName: 'Email to Data Breach Info',
      },
      {
        toolName: 'Email to Mobile Number',
      },
      {
        toolName: 'Email to Find Social Media',
      },
    ],
  },
  {
    toolName: 'Digital Doc',
    icon: IconFileSearch,
    subTools: [
      {
        toolName: 'DOC 365 Intelligence',
      },
      {
        toolName: 'Mobile to Pan Card',
      },
      {
        toolName: 'Mobile to Aadhar Trace',
      },
      {
        toolName: 'Mobile All Linked DOC',
      },
      {
        toolName: 'Aadhar Verify',
      },
      {
        toolName: 'Pan Card Info',
      },
      {
        toolName: 'Voter ID Info',
      },
    ],
  },
  {
    toolName: 'Employee Info',
    icon: IconUserSearch,
    subTools: [
      {
        toolName: 'Mobile to Employee',
      },
      {
        toolName: 'Mobile to Employee',
      },
    ],
  },
];

export default function DigitalIntelligence() {
  const [selectedTools, setSelectedTools] = useState('');

  return (
    <div className="flex flex-col space-y-10">
      <DashboardTitle
        title="Digital Intelligence"
        subTitle="Customise api calls as per your needs."
      />
      <div className="grid max-w-72 grid-cols-1 gap-4">
        {/* main selects */}
        {tools.map((tool) => (
          <div>
            <Button
              key={`${tool.toolName}`}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2 border border-gray-800/50 hover:bg-gray-800/50',
                selectedTools === tool.toolName &&
                  'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
              )}
              onClick={() => {
                if (selectedTools === tool.toolName) {
                  setSelectedTools('');
                } else {
                  setSelectedTools(tool.toolName);
                }
              }}
            >
              <tool.icon className="h-5 w-5" />
              <span className="w-full text-center">{tool.toolName}</span>
            </Button>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
