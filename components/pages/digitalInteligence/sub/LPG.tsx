import React from 'react';

interface PageProps {
  data: {
    lpg_info: {
      name: string;
      address: string;
      gas_provider: string;
      consumer_details: {
        consumer_id: string;
        consumer_type: string;
        consumer_mobile: string;
        consumer_status: string;
      };
      distributor_details: {
        distributor_code: string;
        distributor_name: string;
        distributor_address: string;
        distributor_contact: string;
      };
    }[];
  };
}

const LPG: React.FC<PageProps> = ({ data }) => {
  console.log('RECE', data);
  return (
    <div>
      <h2>LPG Info</h2>
      <pre>{JSON.stringify(data.lpg_info, null, 2)}</pre>
    </div>
  );
};

export default LPG;
