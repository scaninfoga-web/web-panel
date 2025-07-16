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
import M2PanCard from './M2PanCard';

const getComp = new Map<string, React.FC<{ data: any; mobileNo: string }>>([
  [
    'Financial 365 Intelligence',
    Fin365Intelligence as React.FC<{ data: any; mobileNo: string }>,
  ],
  [
    'Mobile to Alternate Number',
    M2MobileNumber as React.FC<{ data: any; mobileNo: string }>,
  ],
  ['Mobile to Gas Info', LPG as React.FC<{ data: any }>],
  ['Mobile to Email', M2Emails as React.FC<{ data: any }>],
  ['Mobile All Linked DOC', M2Documents as React.FC<{ data: any }>],
  ['Mobile to Address', M2Address as React.FC<{ data: any }>],
  ['Mobile to ESIC, UAN', M2EsicUan as React.FC<{ data: any }>],
  ['Mobile to GST, Udyam, IEC', M2GstUdyamIEC as React.FC<{ data: any }>],
  ['Mobile to Multi UPI Info', M2UPI as React.FC<{ data: any }>],
  ['Mobile to Breach Info', M2Breach as React.FC<{ data: any }>],
  ['Mobile 365 Intelligence', M2365 as React.FC<{ data: any }>],
  ['Mobile to Bank Info', M2BankInfo as React.FC<{ data: any }>],
  ['Mobile to Pan Card', M2PanCard as React.FC<{ data: any }>],
  ['Pan Card Info', M2PanCard as React.FC<{ data: any }>],
]);

export default function UniversalDigitalIntelligenceComp({
  data,
  searchTool,
  mobileNo,
}: {
  data: any;
  searchTool: string;
  mobileNo: string;
}) {
  const Comp = getComp.get(searchTool);
  return <div>{Comp ? <Comp data={data} mobileNo={mobileNo} /> : null}</div>;
}
