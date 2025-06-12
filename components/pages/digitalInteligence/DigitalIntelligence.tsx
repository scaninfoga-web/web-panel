'use client';
import DashboardTitle from '@/components/common/DashboardTitle';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import {
  IconBusinessplan,
  IconDeviceSim,
  IconDevicesSearch,
  IconFileSearch,
  IconMailSearch,
  IconUserSearch,
} from '@tabler/icons-react';
import { BadgeIndianRupee, CreditCard } from 'lucide-react';
import React, { useState } from 'react';

const tools: {
  toolName: string;
  icon: any;
  subTools: { toolName: string }[];
}[] = [
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
        toolName: 'Mobile to Doc & Address',
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
        toolName: 'Mobile to Employee Info',
      },
      {
        toolName: 'Aadhar to Employee Info',
      },
      {
        toolName: 'UAN Trace - Get EPFO Statement',
      },
      {
        toolName: 'ESIC Trace',
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
];
type Step = 'method' | 'details' | 'confirmation';

const stepNumbers = {
  method: 1,
  details: 2,
  confirmation: 3,
};
const stepTitles = {
  method: 'Select Tool',
  details: `Fill Required Fields`,
  confirmation: 'Confirmat Transaction',
};

export default function DigitalIntelligence() {
  const [selectedTool, setSelectedTool] = useState<{
    toolName: string;
    icon: any;
    subTools: { toolName: string }[];
  } | null>(null);
  const [selectedSubTool, setSelectedSubTool] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('method');

  const handleSearch = (query: string, filter: string) => {
    console.log(`Searching for ${query} in ${filter}`);
  };

  const nextStep = () => {
    if (currentStep === 'method') {
      if (selectedSubTool) {
        setCurrentStep('details');
      }
    } else if (currentStep === 'details') {
      setCurrentStep('confirmation');
    }
  };

  function onClose() {
    setCurrentStep('method');
    setIsOpen(false);
    setSelectedTool(null);
    setSelectedSubTool('');
  }

  return (
    <div className="flex flex-col space-y-8 pb-2">
      <DashboardTitle
        title="Digital Intelligence"
        subTitle="customise your api as per your needs & pay for what you use"
      />

      <div className="flex space-x-10">
        <div className="grid min-w-60 grid-cols-1 gap-4">
          {/* main selects */}
          {tools.map((tool) => (
            <div key={`${tool.toolName}`} className="flex">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2 border border-gray-800/50 py-6 hover:bg-gray-800/50',
                  selectedTool &&
                    selectedTool.toolName === tool.toolName &&
                    'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                )}
                onClick={() => {
                  if (selectedTool && selectedTool.toolName === tool.toolName) {
                    setSelectedTool(tool);
                  } else {
                    setIsOpen(true);
                    setSelectedTool(tool);
                  }
                }}
              >
                <tool.icon className="h-5 w-5" />
                <span className="w-full text-center">{tool.toolName}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {selectedTool && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogContent className="min-[400px] flex min-w-[800px] flex-col border-slate-800 p-10 text-white shadow-2xl shadow-slate-800 backdrop-blur-3xl">
              <DialogTitle className="text-3xl font-bold text-emerald-500">
                {selectedTool.toolName}
              </DialogTitle>
              <DialogHeader className="mt-4 space-y-2 rounded-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-700 to-emerald-700">
                    <selectedTool.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {stepTitles[currentStep]}
                    </h2>
                    <div>
                      <p className="text-sm text-gray-400">
                        Step {stepNumbers[currentStep]} of 3
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={cn(
                      'h-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-700 transition-all duration-500',
                      currentStep === 'method' && 'w-1/3',
                      currentStep === 'details' && 'w-2/3',
                      currentStep === 'confirmation' && 'w-full',
                    )}
                  />
                </div>
              </DialogHeader>

              <div className="relative mt-4 flex min-h-full flex-col items-center overflow-hidden">
                <div
                  className={cn(
                    'flex w-full transition-transform duration-500 ease-in-out',
                    currentStep === 'method' && 'translate-x-0',
                    currentStep === 'details' && '-translate-x-full',
                    currentStep === 'confirmation' && '-translate-x-[200%]',
                  )}
                >
                  <div className="flex min-w-full flex-col space-y-10">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      {selectedTool.subTools.map((subtool) => {
                        return (
                          <div
                            key={subtool.toolName}
                            className="flex items-center"
                          >
                            <Button
                              variant="ghost"
                              className={cn(
                                'w-full justify-start gap-2 border border-gray-800/50 py-6 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(255,255,255,0.1)] hover:bg-gray-800/50',
                                selectedSubTool === subtool.toolName &&
                                  'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                              )}
                              onClick={() => {
                                if (selectedSubTool === subtool.toolName) {
                                  setSelectedSubTool(subtool.toolName);
                                } else {
                                  setSelectedSubTool(subtool.toolName);
                                }
                              }}
                            >
                              <span className="w-full text-center">
                                {subtool.toolName}
                              </span>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="min-w-full">
                      <Button
                        className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        disabled={!selectedSubTool}
                        onClick={nextStep}
                      >
                        Click to Continue
                      </Button>
                    </div>
                  </div>

                  <div className="min-w-full">
                    <h1 className="flex w-full text-xl font-semibold">
                      {selectedSubTool}
                    </h1>
                    <label
                      className="text-sm font-medium text-white text-white/80"
                      htmlFor="firstInput"
                    >
                      optional
                    </label>
                    <Input
                      id="firstInput"
                      placeholder="Enter mobile no"
                      className="w-full border border-neutral-700"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
}
