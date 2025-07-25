export interface AddressTracingType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: Array<{
    datetime: string;
    data: {
      result: {
        mobile: string;
        addresses: Array<{
          city: string;
          tags: string;
          type: string;
          email: string;
          fname: string;
          lname: string;
          state: string;
          mobile: string;
          country: string;
          pincode: string;
          address1: string;
          address2: string;
          isd_code: string;
          created_at: string;
          is_primary: number;
          state_code: string;
          updated_at: string;
          country_code: string;
          last_delivery_at: string;
        }>;
      };
      status: number;
      message: string;
      api_name: string;
      billable: boolean;
      api_category: string;
    };
  }>;
}
