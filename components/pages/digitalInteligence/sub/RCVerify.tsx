import NotFound from '@/components/sub/NotFound';
import React, { useState } from 'react';
import {
  formatDateTime,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import {
  ChallanType,
  MobileToAccountNumberType,
  PanAllInOneType,
  RazorPayUpiType,
  RCVerifyType,
} from '@/types/BeFiSc';
import { getClientInfo, post } from '@/lib/api';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { toast } from 'sonner';
import SentenceLoader from '../../BeFiSc/sub/SentenceLoader';
import CustomPopUp from '../../BeFiSc/sub/CustomPopUp';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import InfoText2 from '@/components/custom/components/InfoText2';
import CustomBeFiScCard, { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import CustomBadge from '../../BeFiSc/sub/CustomBadge';
import { Separator } from '@/components/ui/separator';
import AddressCustomPopComponent from '@/components/custom/components/AddressCustomPopComponent';
import { cn } from '@/lib/utils';

interface PageProps {
  data: {
    challanData: ChallanType | null;
    rcVerifyData: RCVerifyType | null;
  };
}

const olaData: Map<string, OlaGeoApiType> = new Map();
const RCVerify: React.FC<PageProps> = ({ data }) => {
  const [addressData, setAddressData] = useState<null | {
    address: string;
    data: OlaGeoApiType;
  }>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleView = async (
    address: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (address?.length < 10) {
      e.stopPropagation();
      return toast.error('Address is too small', { id: 1 });
    }
    const clientInfo = getClientInfo();
    try {
      setMapLoading(true);
      if (olaData.get(address)) {
        setAddressData({
          address,
          data: olaData.get(address)!,
        });
        return;
      }
      const res = await post('/api/auth/getmap', {
        userLng: clientInfo.longitude,
        userLat: clientInfo.latitude,
        address: address,
      });
      olaData.set(address, res);
      setAddressData({
        address,
        data: res,
      });
      toast.success('Map Fetched Successfully');
    } catch (error) {
      toast.error('Map Fetched Failed');
    } finally {
      setMapLoading(false);
    }
  };

  return (
    <div className="max-h-[65vh] overflow-auto">
      {(data?.rcVerifyData?.responseData?.length || 0) > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-2">
          {data?.rcVerifyData?.responseData?.map((item, index) => {
            return (
              <DashboardCard
                key={`${index}--${item?.datetime}`}
                title={`${item?.data?.result?.registration_number?.toUpperCase()}`}
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="Name"
                      value={formatSentence(item?.data?.result?.user_name)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Father Name"
                      value={formatSentence(item?.data?.result?.father_name)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Pan Number"
                      value={getValue(item?.data?.result?.pan?.toUpperCase())}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Aadhaar Number"
                      value={getValue(item?.data?.result?.aadhaar)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Voter ID"
                      value={getValue(item?.data?.result?.voter_id)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Passport Number"
                      value={getValue(item?.data?.result?.passport_no)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Passport Number"
                      value={getValue(item?.data?.result?.passport_no)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Mobile"
                      value={getValue(item?.data?.result?.mobile)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Email"
                      value={getValue(item?.data?.result?.email?.toLowerCase())}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="DL No"
                      value={getValue(item?.data?.result?.dl_no)}
                    />
                    <InfoText2
                      label="Dimension"
                      value={getValue(
                        `${item?.data?.result?.width}x${item?.data?.result?.height}x${item?.data?.result?.length}`,
                      )}
                    />
                    <InfoText2
                      label="Status"
                      value={<CustomBadge value={item?.data?.result?.status} />}
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="OP Date"
                      value={getValue(item?.data?.result?.financer?.op_dt)}
                    />
                    <InfoText2
                      label="HP Type"
                      value={getValue(item?.data?.result?.financer?.hp_type)}
                    />
                    <InfoText2
                      label="Financer Name"
                      value={getValue(
                        formatSentence(
                          item?.data?.result?.financer?.financer_name,
                        ),
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Hypothecation Data"
                      value={getValue(
                        item?.data?.result?.financer?.hypothecation_dt,
                      )}
                    />
                    <InfoText2
                      label="Fit Upto"
                      value={getValue(item?.data?.result?.fit_upto)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Tax Mode"
                      value={getValue(item?.data?.result?.tax_mode)}
                    />
                    <InfoText2
                      label="AC Fitted"
                      value={getValue(item?.data?.result?.ac_fitted)}
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="Insurance OP Date"
                      value={getValue(item?.data?.result?.insurance?.opdt)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Insurance Comany"
                      value={getValue(item?.data?.result?.insurance?.company)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Insurance Validity"
                      value={getValue(
                        `${item?.data?.result?.insurance?.validFrom}-${item?.data?.result?.insurance?.validTill}`,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Insurance PolicyNumber"
                      value={getValue(
                        item?.data?.result?.insurance?.policyNumber,
                      )}
                    />
                    <InfoText2
                      label="Insurance Company Code"
                      value={getValue(
                        item?.data?.result?.insurance?.insurance_company_code,
                      )}
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="Model Code"
                      value={getValue(item?.data?.result?.model_code)}
                    />
                    <InfoText2
                      label="Vehicle HP"
                      value={getValue(item?.data?.result?.vehicle_hp)}
                    />
                    <InfoText2
                      label="Expiry Date"
                      value={getValue(item?.data?.result?.expiry_date)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Sale Amount"
                      value={getValue(item?.data?.result?.sale_amount)}
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="Tax Details Reg No"
                      value={getValue(
                        item?.data?.result?.tax_details?.reg_no?.toUpperCase(),
                      )}
                    />
                    <InfoText2
                      label="RCPT Date"
                      value={getValue(item?.data?.result?.tax_details?.rcpt_dt)}
                    />
                    <InfoText2
                      label="RCPT No"
                      value={getValue(item?.data?.result?.tax_details?.rcpt_no)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Tax Amt"
                      value={getValue(item?.data?.result?.tax_details?.tax_amt)}
                    />
                    <InfoText2
                      label="Tax Fine"
                      value={getValue(
                        item?.data?.result?.tax_details?.tax_fine,
                      )}
                    />
                    <InfoText2
                      label="Tax Date"
                      value={getValue(
                        `${item?.data?.result?.tax_details?.tax_from}-${item?.data?.result?.tax_details?.tax_upto}`,
                      )}
                    />
                    <InfoText2
                      label="Tax Mode"
                      value={getValue(
                        item?.data?.result?.tax_details?.tax_mode,
                      )}
                    />
                    <InfoText2
                      label="Tax Payment Mode"
                      value={getValue(
                        item?.data?.result?.tax_details?.payment_mode,
                      )}
                    />
                    <InfoText2
                      label="Collected By"
                      value={getValue(
                        item?.data?.result?.tax_details?.collected_by,
                      )}
                    />
                  </div>

                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="Registration Date"
                      value={getValue(item?.data?.result?.registration_date)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Manufactured Date"
                      value={getValue(
                        item?.data?.result?.vehicle_manufactured_date,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Age"
                      value={getValue(item?.data?.result?.vehicle_age)}
                      valueClassName="text-yellow-500"
                    />

                    <InfoText2
                      label="Owner"
                      value={formatSentence(
                        item?.data?.result?.owner_code_descr,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Category"
                      value={getValue(item?.data?.result?.vehicle_category)}
                    />
                    <InfoText2
                      label="Vehicle Financed"
                      value={
                        <CustomBadge
                          value={item?.data?.result?.vehicle_financed}
                        />
                      }
                    />
                    <InfoText2
                      label="Vehicle Type"
                      value={getValue(item?.data?.result?.vehicle_type)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Type"
                      value={getValue(item?.data?.result?.vehicle_type)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Audio Fitted"
                      value={getValue(item?.data?.result?.audio_fitted)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Video Fitted"
                      value={getValue(item?.data?.result?.video_fitted)}
                    />
                    <InfoText2
                      label="Vehicle Wheelbase"
                      value={getValue(item?.data?.result?.vehicle_wheelbase)}
                    />
                    <InfoText2
                      label="Vehicle Make Model"
                      value={formatSentence(
                        item?.data?.result?.vehicle_make_model,
                      )}
                    />
                    <InfoText2
                      label="Vehicle Gross Weight"
                      value={getValue(item?.data?.result?.vehicle_gross_weight)}
                    />
                    <InfoText2
                      label="Vehicle Owner Number"
                      value={getValue(item?.data?.result?.vehicle_owner_number)}
                    />
                    <InfoText2
                      label="Body Type"
                      value={formatSentence(
                        item?.data?.result?.body_type_description,
                      )}
                    />
                    <InfoText2
                      label="Vehicle Cubic Capacity"
                      value={getValue(
                        item?.data?.result?.vehicle_cubic_capacity,
                      )}
                    />
                    <InfoText2
                      label="Vehicle Stand Capacity"
                      value={getValue(
                        item?.data?.result?.vehicle_stand_capacity,
                      )}
                    />
                    <InfoText2
                      label="Vehicle Unloaded Weight"
                      value={getValue(
                        item?.data?.result?.vehicle_unladen_weight,
                      )}
                    />
                    <InfoText2
                      label="Vehicle Fuel Description"
                      value={formatSentence(
                        item?.data?.result?.vehicle_fuel_description,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Seating Capacity"
                      value={getValue(
                        item?.data?.result?.vehicle_seating_capacity,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Sleeper Capacity"
                      value={getValue(
                        item?.data?.result?.vehicle_sleeper_capacity,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Class Description"
                      value={formatSentence(
                        item?.data?.result?.vehicle_class_description,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Gross Comb Weight"
                      value={getValue(
                        item?.data?.result?.vehicle_gross_comb_weight,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Maker Description"
                      value={formatSentence(
                        item?.data?.result?.vehicle_maker_description,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Number of Cylinders"
                      value={getValue(
                        item?.data?.result?.vehicle_number_of_cylinders,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Engine Number"
                      value={getValue(item?.data?.result?.engine_number)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Purchase Date"
                      value={getValue(item?.data?.result?.purchase_date)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Vehicle Color"
                      value={getValue(item?.data?.result?.vehicle_color)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Chassis Number"
                      value={getValue(item?.data?.result?.chassis_number)}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="Annual Income"
                      value={getValue(item?.data?.result?.annual_income)}
                      valueClassName="text-yellow-500"
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="PUCC Opt Date"
                      value={getValue(item?.data?.result?.pucc_details?.op_dt)}
                    />
                    <InfoText2
                      label="PUCC Number"
                      value={getValue(
                        item?.data?.result?.pucc_details?.pucc_no,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="PUCC Validity"
                      value={getValue(
                        `${item?.data?.result?.pucc_details?.pucc_from}-${item?.data?.result?.pucc_details?.pucc_upto}`,
                      )}
                      valueClassName="text-yellow-500"
                    />
                    <InfoText2
                      label="PUCC Centreno"
                      value={getValue(
                        item?.data?.result?.pucc_details?.pucc_centreno,
                      )}
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="grid grid-cols-3 gap-4">
                    <InfoText2
                      label="Dealer Code"
                      value={getValue(
                        item?.data?.result?.dealer_details?.dealer_code,
                      )}
                    />
                    <InfoText2
                      label="Dealer Name"
                      value={formatSentence(
                        item?.data?.result?.dealer_details?.dealer_name,
                      )}
                    />
                  </div>
                  <Separator className="bg-slate-800" />
                  <AddressCustomPopComponent
                    title="User Present Address"
                    address={item?.data?.result?.user_present_address}
                    className="text-yellow-500"
                  />
                  <Separator className="bg-slate-800" />
                  <AddressCustomPopComponent
                    title="Financer Address"
                    address={
                      item?.data?.result?.financer?.financer_full_address
                    }
                  />
                  <Separator className="bg-slate-800" />
                  <AddressCustomPopComponent
                    title="Dealer Address"
                    address={`${item?.data?.result?.dealer_details?.dealer_address_line1} ${item?.data?.result?.dealer_details?.dealer_address_line2} ${item?.data?.result?.dealer_details?.dealer_address_line3} ${item?.data?.result?.dealer_details?.dealer_district} ${item?.data?.result?.dealer_details?.dealer_pincode}`}
                  />
                </div>
              </DashboardCard>
            );
          })}
          {(data?.challanData?.responseData?.length || 0) > 0 &&
            data?.challanData?.responseData?.map((item, index) => {
              return (
                <DashboardCard
                  key={`${index}--${item?.datetime}`}
                  title={`Challan Details ${formatDateTime(item?.datetime)}`}
                >
                  {item?.data?.result?.map((item, index) => (
                    <div
                      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                      key={`${index}--${item?.challan_date}--${item?.challan_status}`}
                    >
                      <InfoText2
                        label="Accused Name"
                        value={getValue(item?.accused_name)}
                        valueClassName="text-yellow-500"
                      />
                      <InfoText2
                        label="RTO"
                        value={getValue(item?.rto)}
                        valueClassName="text-yellow-500"
                      />
                      <InfoText2 label="State" value={getValue(item?.state)} />
                      <InfoText2
                        label="Pdf Url"
                        value={
                          item?.pdfUrl?.length > 10 ? (
                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500"
                            >
                              Open Link
                            </a>
                          ) : (
                            <span className="cursor-not-allowed text-gray-400">
                              No Link
                            </span>
                          )
                        }
                      />

                      <InfoText2
                        label="Reciept Url"
                        value={
                          item?.recieptUrl?.length > 10 ? (
                            <a
                              href={item.recieptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500"
                            >
                              Open Link
                            </a>
                          ) : (
                            <span className="cursor-not-allowed text-gray-400">
                              No Link
                            </span>
                          )
                        }
                      />

                      <InfoText2
                        label="Challan Date"
                        value={getValue(formatDateTime(item?.challan_date))}
                        valueClassName="text-yellow-500"
                      />
                      <InfoText2
                        label="Challan Place"
                        value={getValue(item?.challan_place)}
                        valueClassName="text-yellow-500"
                      />
                      <InfoText2
                        label="Challan Status"
                        value={<CustomBadge value={item?.challan_status} />}
                      />
                      <InfoText2
                        label="Offence Details"
                        value={formatSentence(item?.offense_details)}
                      />
                    </div>
                  ))}
                </DashboardCard>
              );
            })}
        </div>
      ) : (
        <div>
          <NotFound value="No RC Details Found" />
        </div>
      )}
    </div>
  );
};

export default RCVerify;
