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
import UniversalDigitalIntelligenceComp from './sub/UniversalComp';
import { BreachInfoType } from '@/types/BreachInfo';

const tools: {
  toolName: string;
  icon: any;
  subTools: { toolName: string; searchKey: string }[];
}[] = [
  {
    toolName: 'Number Trace',
    icon: IconDeviceSim,
    subTools: [
      {
        toolName: 'Mobile 365 Intelligence',
        searchKey: '/api/mobile/getMobile360Dtls',
      },
      { toolName: 'Mobile to Doc', searchKey: '' },
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
      { toolName: 'Financial 365 Intelligence', searchKey: '' },
      { toolName: 'Mobile to Bank Info', searchKey: '' },
      { toolName: 'Reverse Account Number', searchKey: '' },
      {
        toolName: 'Mobile to Multi UPI Info',
        searchKey: '/api/mobile/digitalpayment',
      },
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
      {
        toolName: 'Mobile All Linked DOC',
        searchKey: '/api/digital-intelligence/get-document-data',
      },
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
  }>({ toolName: '', searchKey: '' });
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

  const handleSearch = async () => {
    setIsOpen(false);
    setLoading(true);
    const valid = isValidIndianMobileNumber(searchInputValue);
    const toastId = toast.loading('Loading...');
    if (valid && valid.result && selectedSubTool.searchKey) {
      try {
        const response = await post(`${selectedSubTool.searchKey}`, {
          mobile_number: valid.fixedNumber,
          realtimeData: false,
          request_body: valid.fixedNumber,
        });

        if (selectedSubTool?.searchKey === '/api/mobile/breachinfo') {
          const callingWith91 = await post('/api/mobile/breachinfo', {
            request_body: `+91${valid.fixedNumber}`,
            realtimeData: false,
          });
          let dataArray: {
            mobile: string;
            data: BreachInfoType | null;
          }[] = [];
          if (!response?.responseData?.data?.List?.['No results found']) {
            dataArray.push({
              mobile: valid.fixedNumber,
              data: response,
            });
          }
          if (!callingWith91?.responseData?.data?.List?.['No results found']) {
            dataArray.push({
              mobile: `+91${valid.fixedNumber}`,
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
        if (selectedSubTool.searchKey === '/api/mobile/digitalpayment') {
          setResponseData({
            datetime: new Date().toISOString(),
            data: response?.responseData,
          });
          return toast.success('Data Fetched', {
            id: toastId,
          });
        }
        if (selectedSubTool.searchKey === '/api/mobile/getMobile360Dtls') {
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
        let data = {
          responseStatus: {
            status: true,
            message: 'Data fetched from database',
          },
          responseData: {
            txnId: 'b6a9790c-7eaa-4421-be0f-570cba929682',
            result: {
              din_info: {
                code: 'NRF',
                data: [],
              },
              gst_list: {
                code: 'NRF',
                data: [],
              },
              iec_list: {
                code: 'NRF',
                data: [],
              },
              lpg_info: {
                code: 'NRF',
                data: [],
              },
              epfo_info: {
                code: 'NRF',
                data: [],
              },
              esic_info: {
                code: 'NRF',
                data: [],
              },
              msme_info: {
                code: 'SDN',
                data: [],
              },
              telco_info: {
                code: 'SUC',
                data: {
                  msisdn: {
                    mcc: '405',
                    mnc: '872',
                    imsi: '405872000000000',
                    type: 'MOBILE',
                    msisdn: '+919599379326',
                    mcc_mnc: '405872',
                    msisdn_country_code: 'IN',
                  },
                  is_valid: true,
                  is_roaming: false,
                  connection_type: 'prepaid',
                  connection_status: {
                    status_code: 'DELIVERED',
                    error_code_id: '',
                  },
                  subscriber_status: 'CONNECTED',
                  current_service_provider: {
                    mcc: '405',
                    mnc: '872',
                    country_code: 'IN',
                    country_name: 'India',
                    network_name: 'Reliance Jio',
                    country_prefix: '+91',
                    network_prefix: '87003',
                    network_region: 'Delhi',
                  },
                  roaming_service_provider: {
                    mcc: '',
                    mnc: '',
                    country_code: '',
                    country_name: '',
                    network_name: '',
                    country_prefix: '',
                    network_prefix: '',
                    network_region: '',
                  },
                  original_service_provider: {
                    mcc: '405',
                    mnc: '872',
                    country_code: 'IN',
                    country_name: 'India',
                    network_name: 'Airtel',
                    country_prefix: '+91',
                    network_prefix: '95993',
                    network_region: 'Delhi',
                  },
                },
              },
              revoke_info: {
                code: 'SUC',
                data: {
                  revoke_date: 'OCTOBER/2022',
                  revoke_status: 'Yes',
                },
              },
              whatsapp_info: {
                code: 'SUC',
                data: {
                  status: 'Account Found',
                  is_business: '0',
                },
              },
              key_highlights: {
                ie_codes: [],
                din_numbers: [],
                esic_number: [],
                gst_numbers: [],
                revoke_date: 'OCTOBER/2022',
                uan_numbers: [],
                active_status: 'Yes',
                age_of_mobile: '2 to 3 Years',
                udyam_numbers: [],
                connection_type: 'prepaid',
                gas_connection_found: 'No',
                digital_payment_id_name: 'ASHISH TIWARI',
                whatsapp_business_account_status: 'Non-business',
              },
              mobile_age_info: {
                code: 'SUC',
                data: {
                  region: ' Delhi',
                  roaming: 'No',
                  telecom: 'Airtel ',
                  is_ported: 'Yes',
                  mobile_age: '2 to 3 Years',
                  number_valid: 'Yes',
                  number_active: 'Yes',
                  ported_region: ' Delhi',
                  ported_telecom: 'Reliance Jio ',
                },
              },
              director_pan_info: {
                code: 'NRF',
                data: [],
              },
              digital_payment_id_info: {
                code: 'SUC',
                data: {
                  bank: 'Axis Bank',
                  city: 'NEW DELHI',
                  name: 'ASHISH TIWARI',
                  state: 'DELHI',
                  branch: 'SAMAS PUR KHALSA',
                  center: '',
                  address:
                    'GROUND FLOOR, VILLAGE SAMAS PUR KHALSA, POLE NO 058 ADJACENT TO PRIMARY SCHOOL, PO UJWA, NEW DELHI 110073',
                  contact: '+917678210137',
                  district: 'NEW DELHI',
                },
              },
            },
            status: 1,
            apiName: 'Mobile 360',
            message: 'Success',
            billable: true,
            datetime: '2025-07-10 06:46:30.096783',
            apiCategory: 'Fraud Check',
            mobileNumber: '9599379326',
          },
        };

        setResponseData({
          datetime: data?.responseData?.datetime || new Date().toISOString(),
          data: data?.responseData,
        });
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
              searchKey={selectedSubTool.searchKey}
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
