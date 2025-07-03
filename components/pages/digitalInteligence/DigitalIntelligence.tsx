'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { isValidIndianMobileNumber } from '@/components/custom/functions/checkingUtils';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { post } from '@/lib/api';

import { cn } from '@/lib/utils';
import {
  IconBusinessplan,
  IconCalendarWeekFilled,
  IconDeviceSim,
  IconDevicesSearch,
  IconFileSearch,
  IconMailSearch,
  IconUserSearch,
} from '@tabler/icons-react';
import { BadgeIndianRupee, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import BeFiScLoadingSkeleton from '../BeFiSc/sub/BeFiScLoadingSkeleton';
import { formatDateTime } from '@/components/custom/functions/formatUtils';

const tools: {
  toolName: string;
  icon: any;
  subTools: { toolName: string; searchKey: string }[];
}[] = [
  {
    toolName: 'Number Trace',
    icon: IconDeviceSim,
    subTools: [
      { toolName: 'Mobile 365 Intelligence', searchKey: '' },
      { toolName: 'Mobile to Employee Info', searchKey: '' },
      { toolName: 'Mobile to Doc & Address', searchKey: '' },
      { toolName: 'Mobile to DL', searchKey: '' },
      { toolName: 'Mobile to Email', searchKey: '' },
      { toolName: 'Mobile to Breach Info', searchKey: '' },
      { toolName: 'Mobile to Gas Info', searchKey: 'get-lpg-info' },
    ],
  },
  {
    toolName: 'Financial Trace',
    icon: BadgeIndianRupee,
    subTools: [
      { toolName: 'Financial 365 Intelligence', searchKey: '' },
      { toolName: 'Mobile to Bank Info', searchKey: '' },
      { toolName: 'Reverse Account Number', searchKey: '' },
      { toolName: 'Mobile to Multi UPI Info', searchKey: '' },
      { toolName: 'Mobile to Loan Trace', searchKey: '' },
    ],
  },
  {
    toolName: 'Digital Doc',
    icon: IconFileSearch,
    subTools: [
      { toolName: 'DOC 365 Intelligence', searchKey: '' },
      { toolName: 'Mobile to Pan Card', searchKey: '' },
      { toolName: 'Mobile to Aadhar Trace', searchKey: '' },
      { toolName: 'Mobile All Linked DOC', searchKey: '' },
      { toolName: 'Aadhar Verify', searchKey: '' },
      { toolName: 'Pan Card Info', searchKey: '' },
      { toolName: 'Voter ID Info', searchKey: '' },
    ],
  },
  {
    toolName: 'Employee Info',
    icon: IconUserSearch,
    subTools: [
      { toolName: 'Mobile to Employee Info', searchKey: '' },
      { toolName: 'Aadhar to Employee Info', searchKey: '' },
      { toolName: 'UAN Trace - Get EPFO Statement', searchKey: '' },
      { toolName: 'ESIC Trace', searchKey: '' },
    ],
  },
  {
    toolName: 'Business Track',
    icon: IconBusinessplan,
    subTools: [
      { toolName: 'GST Info Trace', searchKey: '' },
      { toolName: 'Udyam Verify Info Trace', searchKey: '' },
    ],
  },
  {
    toolName: 'Email Investigation',
    icon: IconMailSearch,
    subTools: [
      { toolName: 'Email 365 Intelligence', searchKey: '' },
      { toolName: 'Google Profile', searchKey: '' },
      { toolName: 'Google Docking', searchKey: '' },
      { toolName: 'Email to Device Track', searchKey: '' },
      { toolName: 'Email to IP Address', searchKey: '' },
      { toolName: 'Email to Data Breach Info', searchKey: '' },
      { toolName: 'Email to Mobile Number', searchKey: '' },
      { toolName: 'Email to Find Social Media', searchKey: '' },
    ],
  },
  {
    toolName: 'Username Trace',
    icon: IconUserSearch,
    subTools: [
      { toolName: 'Username 365 Intelligence', searchKey: '' },
      { toolName: 'Social Media Trace', searchKey: '' },
      { toolName: 'Google Docking', searchKey: '' },
      { toolName: 'Breach Info Trace', searchKey: '' },
    ],
  },
  {
    toolName: 'IP Investigation',
    icon: IconDevicesSearch,
    subTools: [
      { toolName: 'IP 365 Intelligence', searchKey: '' },
      { toolName: 'IP Address Info', searchKey: '' },
      { toolName: 'Reverse IP Address', searchKey: '' },
      { toolName: 'IP to Device Detect', searchKey: '' },
      { toolName: 'IP to Breach Info', searchKey: '' },
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
    subTools: { toolName: string; searchKey: string }[];
  } | null>(null);
  const [selectedSubTool, setSelectedSubTool] = useState<{
    toolName: string;
    searchKey: string;
  }>({ toolName: '', searchKey: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<{
    datetime: string;
    data: Object;
  } | null>({
    datetime: '2025-07-03T05:54:39.304608Z',
    data: {
      lpg_info: {
        code: 'NRF',
        data: [],
      },
    },
  });

  const handleSearch = async () => {
    const toastId = toast.loading('Loading...');
    setLoading(true);
    const valid = isValidIndianMobileNumber(searchInputValue);
    if (valid && valid.result && selectedSubTool.searchKey) {
      onClose();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const response = await post(
          `/api/digital-intelligence/${selectedSubTool.searchKey}`,
          {
            mobile_number: valid.fixedNumber,
            realtimeData: false,
          },
        );
        setResponseData(response?.responseData);
        toast.success('Data Fetched', {
          id: toastId,
        });
      } catch (error) {
        toast.error('Error', {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    }
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
    setSelectedSubTool({ searchKey: '', toolName: '' });
    setSearchInputValue('');
  }

  return (
    <div className="flex flex-col space-y-8 pb-2">
      <DashboardTitle
        title="Digital Intelligence"
        subTitle="customise your api as per your needs & pay for what you use"
      />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
        <div className="grid min-w-60 grid-cols-2 gap-4 lg:grid-cols-1">
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
                  setSelectedTool(tool);
                  setIsOpen(true);
                }}
              >
                <tool.icon className="h-5 w-5" />
                <span className="w-full text-center">{tool.toolName}</span>
              </Button>
            </div>
          ))}
        </div>

        {loading && <BeFiScLoadingSkeleton />}
        {/* {responseData && !loading && (
          <div className="flex w-full flex-col">
            <div className="flex justify-end">
              <div className="flex items-center space-x-1 text-base font-medium text-gray-400">
                <IconCalendarWeekFilled className="h-5 w-5 text-blue-500" />
                <span>{formatDateTime(responseData?.datetime)}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xl font-semibold text-white">
                {selectedSubTool.toolName}
              </div>
            </div>
          </div>
        )} */}
      </div>

      {selectedTool && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogContent className="min-[400px] flex min-w-[800px] flex-col border-slate-800 bg-slate-950 p-10 text-white shadow-2xl shadow-slate-800">
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
                                selectedSubTool.toolName === subtool.toolName &&
                                  'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                              )}
                              onClick={() => {
                                setSelectedSubTool(subtool);
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
                      {selectedSubTool.toolName}
                    </h1>
                    {/* <label
                      className="text-sm font-medium text-white text-white/80"
                      htmlFor="firstInput"
                    >
                      optional
                    </label> */}
                    <div
                      style={{ height: 'calc(100% - 80px)' }}
                      className="mt-2 flex h-full flex-col justify-between"
                    >
                      <div className="flex flex-col space-y-1">
                        <Input
                          id="firstInput"
                          placeholder="Enter mobile no"
                          className="w-full border border-neutral-700"
                          onChange={(e) => {
                            const isValid = isValidIndianMobileNumber(
                              e.target.value,
                            );
                            if (isValid.result) {
                              setSearchInputValue(isValid.fixedNumber);
                              setValid(true);
                            } else {
                              setValid(false);
                            }
                          }}
                        />
                        {!valid && (
                          <p className="text-sm text-red-500">
                            Please enter a valid mobile number
                          </p>
                        )}
                      </div>
                      <div className="min-w-full">
                        <Button
                          className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                          disabled={!valid}
                          onClick={handleSearch}
                        >
                          Click to Search
                        </Button>
                      </div>
                    </div>
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
