import React from 'react';
import LPG from './LPG';
import M2Emails from './M2Emails';
import M2Documents from './M2Documents';
import M2Address from './M2Address';
import M2MobileNumber from './M2Mobile';
import M2UPI from './M2UPI';
import M2EsicUan from './M2UanEsic';
import M2GstUdyamIEC from './M2GstUdyamIEC';
import M2Breach from './M2Breach';
import M2365 from './M2365';
import M2BankInfo from './M2BankInfo';
import Fin365Intelligence from './Fin365Intelligence';

const getComp = new Map<string, React.FC<{ data: any; mobileNo: string }>>([
  ['/api/digital-intelligence/get-lpg-info', LPG as React.FC<{ data: any }>],
  [
    '/api/digital-intelligence/get-alt-email',
    M2Emails as React.FC<{ data: any }>,
  ],
  [
    '/api/digital-intelligence/get-document-data',
    M2Documents as React.FC<{ data: any }>,
  ],
  [
    '/api/digital-intelligence/get-address',
    M2Address as React.FC<{ data: any }>,
  ],
  [
    '/api/digital-intelligence/get-alt-mobile-number',
    M2MobileNumber as React.FC<{ data: any; mobileNo: string }>,
  ],
  [
    '/api/digital-intelligence/get-esic-uan',
    M2EsicUan as React.FC<{ data: any }>,
  ],
  [
    '/api/digital-intelligence/get-gst-udyam-iec',
    M2GstUdyamIEC as React.FC<{ data: any }>,
  ],
  ['/api/mobile/digitalpayment', M2UPI as React.FC<{ data: any }>],
  ['/api/mobile/breachinfo', M2Breach as React.FC<{ data: any }>],
  ['/api/mobile/getMobile360Dtls', M2365 as React.FC<{ data: any }>],
  ['/api/mobile/getAcDtlsFromMobNo', M2BankInfo as React.FC<{ data: any }>],
  [
    '/api/mobile/profileadvance',
    Fin365Intelligence as React.FC<{ data: any; mobileNo: string }>,
  ],
]);

export default function UniversalDigitalIntelligenceComp({
  data,
  searchKey,
  mobileNo,
}: {
  data: any;
  searchKey: string;
  mobileNo: string;
}) {
  const Comp = getComp.get(searchKey);
  return <div>{Comp ? <Comp data={data} mobileNo={mobileNo} /> : null}</div>;
}
