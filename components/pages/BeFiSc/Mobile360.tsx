import { Mobile360Type } from '@/types/BeFiSc';
import { Loader2, Smartphone } from 'lucide-react';
import {
  DashboardCard,
  InfoText,
  StatusBadge,
} from '../dashboard/components/DashboardCard';
import { LPGInfoTable } from './LPGTable';
import { Card } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';

interface PageProps {
  data: Mobile360Type | null;
}

export default function Mobile360({ data }: PageProps) {
  if (!data) {
    return (
      <div className="mt-8">
        <Loader />
      </div>
    );
  }
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const getValue = (value: string | undefined | null) =>
    value && value.trim().length > 0 ? value : 'No Data';

  const date = new Date(data.datetime.replace(' ', 'T'));
  const formattedDate = date.toLocaleString('en-IN', options);
  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">Banking Info</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-base font-medium">
              {getValue(data.result.digitalPaymentIdInfo?.data.name)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Bank</p>
            <p className="text-base font-medium">
              {getValue(data.result.digitalPaymentIdInfo?.data.bank)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Branch Address</p>
            <p className="text-sm font-medium">
              {getValue(data.result.digitalPaymentIdInfo?.data.address) +
                ', ' +
                getValue(data.result.digitalPaymentIdInfo?.data.district) +
                ', ' +
                getValue(data.result.digitalPaymentIdInfo?.data.city)}
            </p>
          </div>
          <div>
            {/* <div>
              <p className="text-sm text-gray-400">Contact</p>
              <p className="text-base font-medium">
                {data.result.digitalPaymentIdInfo.data.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Branch</p>
              <p className="text-base font-medium">
                {data.result.digitalPaymentIdInfo.data.name}
              </p>
            </div> */}
            <p className="text-sm text-gray-400">Branch Contact</p>
            <p className="text-base font-medium">
              {getValue(data.result.digitalPaymentIdInfo?.data.contact)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">State</p>
            <p className="text-base font-medium">
              {getValue(data.result.digitalPaymentIdInfo?.data.state)}
            </p>
          </div>
        </div>
      </Card>
      {/* digitalPaymentIdInfo */}

      {/* lpgInfo */}
      <DashboardCard title="LPG Info">
        <LPGInfoTable lpgInfo={data.result?.lpgInfo} />
      </DashboardCard>

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
        {/* msmeInfo */}
        <DashboardCard title="MSME Info" className="flex flex-col gap-y-2 pt-1">
          <div className="grid grid-rows-2 gap-6">
            {data.result.msmeInfo?.data?.map((val, index) => (
              <div key={index} className="flex flex-col">
                <InfoText
                  label="Udyam Number"
                  value={getValue(val.udyamNumber)}
                />
                <InfoText
                  label="Enterprise Name"
                  value={getValue(val.enterpriseName)}
                />
              </div>
            ))}
          </div>
        </DashboardCard>
        {/* epfoInfo */}
        <DashboardCard title="EPFO Info" className="flex flex-col gap-y-2 pt-1">
          <div className="flex gap-2">
            {data.result.epfoInfo?.data?.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
              >
                {getValue(val)}
              </div>
            ))}
          </div>
        </DashboardCard>
        {/* directorPanInfo */}
        <DashboardCard
          title="Director Pan Info"
          className="flex flex-col gap-y-2 pt-1"
        >
          <div className="flex flex-row gap-6">
            {data.result.directorPanInfo?.data?.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
              >
                {getValue(val)}
              </div>
            ))}
          </div>
        </DashboardCard>
        {/* dinInfo */}
        <DashboardCard title="Din Info" className="flex flex-col gap-y-2 pt-1">
          <div className="flex flex-row gap-6">
            {data.result.dinInfo?.data?.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
              >
                <InfoText label="Pan" value={getValue(val.pan)} />
                <InfoText label="Name" value={getValue(val.data.name)} />
                <InfoText label="Din" value={getValue(val.data.din)} />
              </div>
            ))}
          </div>
        </DashboardCard>
        {/* gstList */}
        <DashboardCard title="GST List" className="flex flex-col gap-y-2 pt-1">
          <div className="flex flex-row gap-6">
            {data.result.gstList?.data?.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
              >
                {getValue(val)}
              </div>
            ))}
          </div>
        </DashboardCard>
        {/* whatsappInfo */}
        <DashboardCard
          title="Whatsapp Info"
          className="flex flex-col gap-y-2 pt-1"
        >
          <div className="flex flex-col">
            <InfoText
              label="Status"
              value={getValue(data.result.whatsappInfo?.data?.status)}
            />
            <InfoText
              label="isBusiness"
              value={getValue(data.result.whatsappInfo?.data.isBusiness)}
            />
          </div>
        </DashboardCard>

        {/* revokeInfo */}
        <DashboardCard
          title="Revoke Info"
          className="flex flex-col gap-y-2 pt-1"
        >
          <div className="flex flex-col">
            <InfoText
              label="Revoke Status"
              value={getValue(data.result.revokeInfo?.data.revokeStatus)}
            />
            <InfoText
              label="Revoke Date"
              value={getValue(data.result.revokeInfo?.data.revokeDate)}
            />
          </div>
        </DashboardCard>

        {/* esicInfo */}
        <DashboardCard title="ESIC Info" className="flex flex-col gap-y-2 pt-1">
          <div className="flex flex-row gap-6">
            {data.result.esicInfo?.data?.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
              >
                {getValue(val)}
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* telcoInfo */}
        <DashboardCard
          title="Telco Info"
          className="flex flex-col gap-y-2 pt-1"
        >
          <InfoText
            label="isValid"
            value={
              <StatusBadge
                status={String(data.result.telcoInfo?.data?.isValid)}
                variant={
                  data.result.telcoInfo?.data?.isValid
                    ? 'outline'
                    : 'destructive'
                }
              />
            }
          />
          <InfoText
            label="Subscriber Status"
            value={
              <StatusBadge
                status={getValue(data.result.telcoInfo?.data?.subscriberStatus)}
                variant={'outline'}
              />
            }
          />
          <InfoText
            label="Connection Status"
            value={
              <StatusBadge
                status={getValue(
                  data.result.telcoInfo?.data?.connectionStatus?.statusCode,
                )}
                variant={'outline'}
              />
            }
          />
          <InfoText
            label="Connection Type"
            value={
              <StatusBadge
                status={data.result.telcoInfo?.data?.connectionType}
                variant={'outline'}
              />
            }
          />
          <InfoText
            label="msisdn Country Code"
            value={data.result.telcoInfo?.data?.msisdn.msisdnCountryCode}
          />
          <InfoText
            label="msisdn"
            value={data.result.telcoInfo?.data?.msisdn.msisdn}
          />
          <InfoText
            label="Type"
            value={data.result.telcoInfo?.data?.msisdn.type}
          />
          <InfoText
            label="mnc"
            value={data.result.telcoInfo?.data?.msisdn.mnc}
          />
          <InfoText
            label="imsi"
            value={data.result.telcoInfo?.data?.msisdn.imsi}
          />
          <InfoText
            label="mcc"
            value={data.result.telcoInfo?.data?.msisdn.mcc}
          />
          <InfoText
            label="mccMnc"
            value={data.result.telcoInfo?.data?.msisdn.mccMnc}
          />
          <InfoText
            label="Current Network Name"
            value={
              data.result.telcoInfo?.data?.currentServiceProvider?.networkName
            }
          />
          <InfoText
            label="Current Network Region"
            value={
              data.result.telcoInfo?.data?.currentServiceProvider
                ?.networkRegion +
              ', ' +
              data.result.telcoInfo?.data?.currentServiceProvider?.countryName
            }
          />
          <InfoText
            label="Original Network Name"
            value={
              data.result.telcoInfo?.data?.originalServiceProvider?.networkName
            }
          />
          <InfoText
            label="Original Network Region"
            value={
              data.result.telcoInfo?.data?.originalServiceProvider
                ?.networkRegion +
              ', ' +
              data.result.telcoInfo?.data?.originalServiceProvider?.countryName
            }
          />
          <InfoText
            label="isRoaming"
            value={
              <StatusBadge
                status={String(data.result.telcoInfo?.data?.isRoaming)}
                variant={
                  data.result.telcoInfo?.data?.isRoaming
                    ? 'outline'
                    : 'destructive'
                }
              />
            }
          />
        </DashboardCard>

        {/* mobileAgeInfo */}
        <DashboardCard
          title="Mobile Age Info"
          className="flex flex-col gap-y-2 pt-1"
        >
          <div className="flex flex-col">
            <InfoText
              label="isPorted"
              value={
                <StatusBadge
                  status={data.result.mobileAgeInfo?.data?.isPorted}
                  variant={
                    data.result.mobileAgeInfo?.data?.isPorted === 'Yes'
                      ? 'outline'
                      : 'destructive'
                  }
                />
              }
            />
            <InfoText
              label="Mobile Age"
              value={data.result.mobileAgeInfo?.data?.mobileAge}
            />
            <InfoText
              label="Number Active"
              value={
                <StatusBadge
                  status={data.result.mobileAgeInfo?.data?.numberActive}
                  variant={
                    data.result.mobileAgeInfo?.data?.numberActive === 'Yes'
                      ? 'outline'
                      : 'destructive'
                  }
                />
              }
            />
            <InfoText
              label="Number Valid"
              value={
                <StatusBadge
                  status={data.result.mobileAgeInfo?.data?.numberValid}
                  variant={
                    data.result.mobileAgeInfo?.data?.numberValid === 'Yes'
                      ? 'outline'
                      : 'destructive'
                  }
                />
              }
            />
            <InfoText
              label="Ported Telecom"
              value={data.result.mobileAgeInfo?.data?.portedTelecom}
            />
            <InfoText
              label="Region"
              value={data.result.mobileAgeInfo?.data?.region}
            />
            <InfoText
              label="Roaming"
              value={
                <StatusBadge
                  status={data.result.mobileAgeInfo?.data?.roaming}
                  variant={
                    data.result.mobileAgeInfo?.data?.roaming === 'Yes'
                      ? 'outline'
                      : 'destructive'
                  }
                />
              }
            />
            <InfoText
              label="Telecom"
              value={data.result.mobileAgeInfo?.data?.telecom}
            />
          </div>
        </DashboardCard>
        {/* keyHighlights? */}
        <DashboardCard
          title="Key Highlights"
          className="flex flex-col gap-y-2 pt-1"
        >
          <div className="flex flex-col">
            <InfoText
              label="Digital PaymentId Name"
              value={data.result.keyHighlights?.digitalPaymentIdName}
            />
            <InfoText
              label="Gas Connection Found"
              value={data.result.keyHighlights?.gasConnectionFound}
            />
            <InfoText
              label="Udyam Numbers"
              value={JSON.stringify(data.result.keyHighlights?.udyamNumbers)}
            />
            <InfoText
              label="GST Numbers"
              value={JSON.stringify(data.result.keyHighlights?.gstNumbers)}
            />
            <InfoText
              label="DIN Numbers"
              value={JSON.stringify(data.result.keyHighlights?.dinNumbers)}
            />
            <InfoText
              label="ESIC Number"
              value={JSON.stringify(data.result.keyHighlights?.esicNumber)}
            />
            <InfoText
              label="IE Codes"
              value={JSON.stringify(data.result.keyHighlights?.ieCodes)}
            />
            <InfoText
              label="Connection Type"
              value={data.result.keyHighlights?.connectionType}
            />
            <InfoText
              label="Whatsapp Business Status"
              value={data.result.keyHighlights?.whatsappBusinessAccountStatus}
            />
            <InfoText
              label="Age Of Mobile"
              value={data.result.keyHighlights?.ageOfMobile}
            />
            <InfoText
              label="Active Status"
              value={
                <StatusBadge
                  status={data.result.keyHighlights?.activeStatus}
                  variant={
                    data.result.keyHighlights?.activeStatus === 'Yes'
                      ? 'outline'
                      : 'destructive'
                  }
                />
              }
            />
            <InfoText
              label="Revoke Date"
              value={data.result.keyHighlights?.revokeDate ?? 'No Data'}
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
