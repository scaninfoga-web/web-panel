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
import { BadgeIndianRupee, CarFront } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import BeFiScLoadingSkeleton from '../BeFiSc/sub/BeFiScLoadingSkeleton';
import { formatDateTime } from '@/components/custom/functions/formatUtils';
import UniversalDigitalIntelligenceComp from './sub/UniversalComp';
import { BreachInfoType } from '@/types/BreachInfo';
import {
  EquifaxV3Type,
  MobileToAccountNumberType,
  PanAllInOneType,
  ProfileAdvanceType,
  RazorPayUpiType,
} from '@/types/BeFiSc';
import { PayWorldType } from '@/types/payworld';
import CustomInputSearch from '@/components/custom/components/CustomInput';

const tools: {
  toolName: string;
  icon: any;
  subTools: {
    toolName: string;
    searchKey: string;
    inputs?: {
      label: string;
      upperOnly?: boolean;
      placeholder: string;
      type: 'number' | 'text';
      validCheck: (e: string) => boolean;
    }[];
  }[];
}[] = [
  {
    toolName: 'Number Trace',
    icon: IconDeviceSim,
    subTools: [
      {
        toolName: 'Mobile 365 Intelligence',
        searchKey: '/api/mobile/getMobile360Dtls',
      },
      // { toolName: 'Mobile to Doc', searchKey: '' },
      {
        toolName: 'Mobile to Address',
        searchKey: '/api/digital-intelligence/get-address',
      },
      { toolName: 'Mobile to DL', searchKey: '' },
      {
        toolName: 'Mobile to Email',
        searchKey: '/api/digital-intelligence/get-alt-email',
      },
      {
        toolName: 'Mobile to Alternate Number',
        searchKey: '/api/digital-intelligence/get-alt-mobile-number',
      },
      {
        toolName: 'Mobile to Breach Info',
        searchKey: '/api/mobile/breachinfo',
      },
      {
        toolName: 'Mobile to Gas Info',
        searchKey: '/api/digital-intelligence/get-lpg-info',
      },
    ],
  },
  {
    toolName: 'Financial Trace',
    icon: BadgeIndianRupee,
    subTools: [
      {
        toolName: 'Financial 365 Intelligence',
        searchKey: '/api/mobile/profileadvance',
      },
      {
        toolName: 'Mobile to Bank Info',
        searchKey: '/api/mobile/getAcDtlsFromMobNo',
      },
      { toolName: 'Reverse Account Number', searchKey: '' },
      {
        toolName: 'Mobile to Multi UPI Info',
        searchKey: '/api/mobile/digitalpayment',
      },
      { toolName: 'Mobile to Loan Trace', searchKey: '' },
    ],
  },
  {
    toolName: 'Vehicle Trace',
    icon: CarFront,
    subTools: [
      {
        toolName: 'RC Verify',
        searchKey: '/api/mobile/rc-verify-full-data',
        inputs: [
          {
            label: 'Vehicle Number',
            placeholder: 'Enter Vehicle Number',
            type: 'text',
            upperOnly: true,
            validCheck: (vehicle) => {
              const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{1,4}$/;
              return vehicleRegex.test(vehicle.toUpperCase());
            },
          },
        ],
      },
    ],
  },
  {
    toolName: 'Digital Doc',
    icon: IconFileSearch,
    subTools: [
      { toolName: 'DOC 365 Intelligence', searchKey: '' },
      {
        toolName: 'Mobile to Pan Card',
        searchKey: '/api/digital-intelligence/get-document-data',
      },
      { toolName: 'Mobile to Aadhar Trace', searchKey: '' },
      {
        toolName: 'Mobile All Linked DOC',
        searchKey: '/api/digital-intelligence/get-document-data',
      },
      { toolName: 'Aadhar Verify', searchKey: '' },
      {
        toolName: 'Pan Card Info',
        searchKey: '/api/mobile/panallinone',
        inputs: [
          {
            label: 'Pan Number',
            placeholder: 'Enter Pan Number',
            upperOnly: true,
            type: 'text',
            validCheck: (pan) => {
              const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
              return panRegex.test(pan.toUpperCase());
            },
          },
        ],
      },
      { toolName: 'Voter ID Info', searchKey: '' },
    ],
  },
  {
    toolName: 'Employee Info',
    icon: IconUserSearch,
    subTools: [
      { toolName: 'Mobile to Employee Info', searchKey: '' },
      {
        toolName: 'Mobile to ESIC, UAN',
        searchKey: '/api/digital-intelligence/get-esic-uan',
      },
      { toolName: 'Aadhar to Employee Info', searchKey: '' },
      { toolName: 'ESIC Trace', searchKey: '' },
      { toolName: 'UAN -EPFO Statement', searchKey: '' },
    ],
  },
  {
    toolName: 'Business Track',
    icon: IconBusinessplan,
    subTools: [
      {
        toolName: 'Mobile to GST, Udyam, IEC',
        searchKey: '/api/digital-intelligence/get-gst-udyam-iec',
      },
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
    inputs?: {
      label: string;
      placeholder: string;
      upperOnly?: boolean;
      type: 'number' | 'text';
      validCheck: (value: string) => boolean;
    }[];
  }>({ toolName: '', searchKey: '', inputs: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<{
    datetime: string;
    data: Object | null | Array<any>;
  } | null>({
    datetime: '',
    data: null,
  });

  const handleSearch = async (searchValue: string) => {
    setIsOpen(false);
    setLoading(true);
    setSearchInputValue(searchValue);
    const toastId = toast.loading('Loading...');
    try {
      let bodyName = 'mobile_number';
      if (selectedSubTool.toolName === 'Pan Card Info') {
        bodyName = 'pan_number';
      }
      if (selectedSubTool.toolName === 'Mobile to Breach Info') {
        bodyName = 'request_body';
      }
      const response = await post(`${selectedSubTool.searchKey}`, {
        [bodyName]: searchValue,
        realtimeData: false,
      });

      if (selectedSubTool.toolName === 'Pan Card Info') {
        setResponseData({
          datetime:
            response?.responseData?.datetime || new Date().toISOString(),
          data: response?.responseData,
        });
        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (selectedSubTool.toolName === 'Mobile to Pan Card') {
        const pan = response?.responseData?.data?.document_data?.pan?.[0];
        if (pan) {
          // calling profileAdvance
          const panAllInOne = await post('/api/mobile/panallinone', {
            pan_number: pan,
            realtimeData: false,
          });
          setResponseData({
            data: panAllInOne?.responseData,
            datetime:
              panAllInOne?.responseData?.datetime || new Date().toISOString(),
          });
        } else {
          setResponseData({
            data: {},
            datetime: new Date().toISOString(),
          });
        }
        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (selectedSubTool.toolName === 'Financial 365 Intelligence') {
        const data = await handleFIN365(response, valid);
        setResponseData({
          datetime:
            response?.responseData?.datetime || new Date().toISOString(),
          data: {
            profileAdvanceData: data?.profileAdvanceData,
            panAllInOneData: data?.panAllInOneData,
            equifaxV3Data: data?.equifaxV3Data,
            upiDetailsData: data?.upiDetailsData,
            payworldData: data?.payworldData,
            mobileToAccountData: data?.mobileToAccountData,
            razorPayData: data?.razorPayData,
          },
        });

        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (selectedSubTool.toolName === 'Mobile to Bank Info') {
        const ifsc =
          response?.responseData?.result?.account_details?.account_ifsc;
        let ifscData: RazorPayUpiType | null = null;
        try {
          if (ifsc) {
            const ifscRes = await post('/api/secondary/ifsc-data', {
              ifsc_code: ifsc,
              realtimeData: false,
            });
            ifscData = ifscRes;
          }
        } catch (error) {}
        setResponseData({
          datetime: response?.datetime || new Date().toISOString(),
          data: {
            razorPayData: ifscData,
            mobileToBankData: response.responseData,
          },
        });
        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (selectedSubTool.toolName === 'Mobile to Breach Info') {
        const callingWith91 = await post('/api/mobile/breachinfo', {
          request_body: `+91${searchValue}`,
          realtimeData: false,
        });
        let dataArray: {
          mobile: string;
          data: BreachInfoType | null;
        }[] = [];
        if (!response?.responseData?.data?.List?.['No results found']) {
          dataArray.push({
            mobile: searchValue,
            data: response,
          });
        }
        if (!callingWith91?.responseData?.data?.List?.['No results found']) {
          dataArray.push({
            mobile: `+91${searchValue}`,
            data: callingWith91,
          });
        }
        setResponseData({
          datetime: new Date().toISOString(),
          data: dataArray,
        });
        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (selectedSubTool.toolName === 'Mobile to Multi UPI Info') {
        setResponseData({
          datetime: new Date().toISOString(),
          data: response?.responseData,
        });
        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (selectedSubTool.toolName === 'Mobile 365 Intelligence') {
        setResponseData({
          datetime:
            response?.responseData?.datetime || new Date().toISOString(),
          data: response?.responseData,
        });
        return toast.success('Data Fetched', {
          id: toastId,
        });
      }
      if (response.responseData?.data && response.responseData?.datetime) {
        setResponseData(response?.responseData);
      }
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
    setResponseData({
      datetime: '',
      data: null,
    });
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
            <div key={`${tool.toolName}`} className="flex text-sm sm:text-base">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2 overflow-hidden border border-gray-800/50 py-6 hover:bg-gray-800/50',
                  selectedTool &&
                    selectedTool.toolName === tool.toolName &&
                    'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                )}
                onClick={() => {
                  onClose();
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
        {responseData?.data && !loading && (
          <div className="flex w-full flex-col border-t border-slate-900 p-4 lg:border-l lg:border-t-0">
            <div className="flex h-10 w-full items-center justify-between">
              <div className="text-lg font-semibold text-emerald-500 lg:text-xl">
                {selectedSubTool.toolName}
              </div>
              <div className="flex items-center space-x-1 whitespace-nowrap text-base font-medium text-gray-400">
                <IconCalendarWeekFilled className="h-5 w-5 text-blue-500" />
                <span>{formatDateTime(responseData?.datetime)}</span>
              </div>
            </div>

            <UniversalDigitalIntelligenceComp
              data={responseData?.data}
              searchTool={selectedSubTool.toolName}
              mobileNo={searchInputValue}
            />
          </div>
        )}
      </div>

      {selectedTool && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogContent className="flex-col border-slate-800 bg-slate-950 text-white shadow-2xl shadow-slate-800 lg:min-w-[700px] lg:p-10">
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
                    <div className="grid max-h-[400px] grid-cols-1 gap-4 overflow-auto p-4 lg:grid-cols-2">
                      {selectedTool.subTools.map((subtool) => {
                        return (
                          <div
                            key={subtool.toolName}
                            className="flex items-center"
                          >
                            <Button
                              variant="ghost"
                              className={cn(
                                'relative w-full justify-start gap-2 border border-gray-800/50 py-6 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(255,255,255,0.1)] hover:bg-gray-800/50',
                                selectedSubTool.toolName === subtool.toolName &&
                                  'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
                              )}
                              disabled={subtool.searchKey.length <= 2}
                              onClick={() => {
                                setSelectedSubTool(subtool);
                              }}
                            >
                              {subtool.searchKey?.length < 1 && (
                                <span className="absolute right-2 top-1 rounded-full bg-yellow-400/20 px-1.5 py-0.5 text-[9px] font-semibold text-yellow-400 shadow-sm">
                                  Coming Soon
                                </span>
                              )}
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

                    <div
                      style={{ height: 'calc(100% - 80px)' }}
                      className="mt-2 flex h-full flex-col justify-between"
                    >
                      <div className="flex min-h-full flex-col space-y-4">
                        {(selectedSubTool?.inputs?.length || 0) > 0 &&
                          selectedSubTool?.inputs?.map((input) => (
                            <CustomInputSearch
                              key={input.label}
                              label={input.label}
                              upperOnly={input?.upperOnly}
                              placeholder={input.placeholder}
                              type={input.type}
                              handleSearch={handleSearch}
                              validCheckFunction={input.validCheck}
                            />
                          ))}
                        {!selectedSubTool?.inputs && (
                          <CustomInputSearch
                            label="Mobile Number"
                            upperOnly={true}
                            placeholder="Enter mobile no"
                            type="number"
                            handleSearch={handleSearch}
                            validCheckFunction={(value: string) => {
                              return isValidIndianMobileNumber(value).result;
                            }}
                          />
                        )}
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

async function handleFIN365(response: any, valid: any) {
  let profileAdvanceData: ProfileAdvanceType | null = null;
  let panAllInOneData: PanAllInOneType | null = null;
  let equifaxV3Data: EquifaxV3Type | null = null;
  let upiDetailsData: any = null;
  let payworldData: PayWorldType | null = null;
  let razorPayData: RazorPayUpiType | null = null;
  let mobileToAccountData: MobileToAccountNumberType | null = null;

  if (
    Number(response.responseData?.status) === 1 ||
    Number(response.responseData?.status) === 2
  ) {
    profileAdvanceData = response.responseData;
  }

  try {
    const ActDetails = await post('/api/mobile/getAcDtlsFromMobNo', {
      mobile_number: valid?.fixedNumber,
      realtimeData: false,
    });
    if (Number(ActDetails.responseData?.status) === 1) {
      mobileToAccountData = ActDetails.responseData;
    }
    const ifsc =
      ActDetails?.responseData?.result?.account_details?.account_ifsc;
    if (ifsc) {
      const ifscRes = await post('/api/secondary/ifsc-data', {
        ifsc_code: ifsc,
        realtimeData: false,
      });
      razorPayData = ifscRes;
    }
  } catch (error) {}

  const panNumber = profileAdvanceData?.result?.document_data?.pan[0]?.value;

  if (panNumber) {
    // calling panAllInone
    try {
      const panAllInOne = await post('/api/mobile/panallinone', {
        pan_number: panNumber,
        realtimeData: false,
      });
      if (
        Number(panAllInOne.responseData?.status) === 1 ||
        Number(panAllInOne.responseData?.status) === 2
      ) {
        panAllInOneData = panAllInOne.responseData;
      }
    } catch (error) {}
    try {
      const EquifaxData = await post('/api/mobile/equifaxv3', {
        mobile: valid.fixedNumber,
        name: 'bank',
        id_type: 'pan',
        id_number: panNumber,
        realtimeData: false,
      });
      if (
        Number(EquifaxData.responseData?.status) === 1 ||
        Number(EquifaxData.responseData?.status) === 2
      ) {
        equifaxV3Data = EquifaxData.responseData;
      }
    } catch (error) {}
  }

  try {
    const UpiDetails = await post('/api/mobile/digitalpayment', {
      mobile_number: valid?.fixedNumber,
      realtimeData: false,
    });
    if (UpiDetails.responseStatus?.status === true) {
      upiDetailsData = UpiDetails?.responseData;
    }
  } catch (error) {}
  try {
    const payworld = await post('/api/secondary/payworld-all-data', {
      sender_mobile: valid?.fixedNumber,
    });
    if (payworld?.responseData) {
      payworldData = payworld;
    }
  } catch (error) {}

  return {
    profileAdvanceData,
    panAllInOneData,
    equifaxV3Data,
    upiDetailsData,
    payworldData,
    razorPayData,
    mobileToAccountData,
  };
}
