import React from 'react';
import LPG from './LPG';

const getComp: Map<string, React.FC<{ data: any }>> = new Map([
  ['get-lpg-info', LPG],
]);

export default function UniversalDigitalIntelligenceComp({
  data,
  searchKey,
}: {
  data: any;
  searchKey: string;
}) {
  const Comp = getComp.get(searchKey);
  return <div>{Comp ? <Comp data={data} /> : null}</div>;
}
