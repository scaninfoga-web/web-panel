import { UPIType } from '@/types/BeFiSc';
import React from 'react';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import { formatKey } from './CustomBeFiScCard';
import { formatSentence } from './APIUtils';
import Image from 'next/image';
const upiIcons = new Map<string, string>([
  ['PhonePe', '/upi/phonepe.png'],
  ['FinoPay', '/upi/FinoPay.png'],
  ['Amazon Pay', '/upi/amazonpay.png'],
  ['Paytm', '/upi/paytm.png'],
  ['BHIM', '/upi/BHIM.svg'],
  ['Axis Bank', '/upi/AxisBank.png'],
  ['Groww', '/upi/Groww.svg'],
  ['Mobikwik', '/upi/Mobikwik.svg'],
  ['State Bank of India', '/upi/StateBankofIndia.png'],
  ['Airtel Payments Bank', '/upi/airtelpayments.png'],
  ['HDFC Bank', '/upi/HDFCBank.png'],
  ['IDFC FIRST Bank', '/upi/IDFCFIRSTBank.jpeg'],
  ['super.money', '/upi/super-money.jpeg'],
  ['QuikWallet', '/upi/QuikWallet.png'],
  ['Cheq', '/upi/Cheq.png'],
  ['Jana Bank', '/upi/JanaBank.png'],
  ['MyJio UPI', '/upi/MyJio UPI.svg'],
  ['Fampay', '/upi/Fampay.jpeg'],
  ['Bajaj Finserv', '/upi/BajajFinserv.jpeg'],
  ['PayZapp', '/upi/PayZap.png'],
  ['Zomato', '/upi/zomato.png'],
  ['Jupiter', '/upi/jupiter.svg'],
  ['Bank of Baroda', '/upi/BankofBaroda.png'],
]);

export default function UpiDetails({
  UpiData,
  realName,
}: {
  UpiData: UPIType | null;
  realName: string;
}) {
  if (!UpiData) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {Object.entries(UpiData.responseData).map(([upiId, data]) => {
        if (!data.success) {
          return null;
        }

        return (
          <DashboardCard
            notifytitle={
              data?.data?.result?.name
                .trim()
                .replace(/\s+/g, ' ')
                .toLowerCase() === realName
                ? null
                : 'view details?'
            }
            icon={
              <Image
                src={upiIcons.get(data.platform) || '/null.png'}
                width={50}
                height={50}
                alt="icon"
                className="relative -left-2 rounded-full bg-white p-0.5"
              />
            }
            titleBig={false}
            title={`${upiId}-${'  '}${data.platform}`}
            key={data.data.txn_id}
          >
            <div>
              {Object.entries(data?.data?.result).map(([key, value], index) => {
                if (key === 'center') {
                  return null;
                }
                if (key === 'address') {
                  return (
                    <InfoText
                      label={formatKey(key)}
                      value={formatSentence(value.slice(0, 30))}
                    />
                  );
                }
                return (
                  <InfoText
                    key={index}
                    label={formatKey(key)}
                    value={formatSentence(value)}
                  />
                );
              })}
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
}
