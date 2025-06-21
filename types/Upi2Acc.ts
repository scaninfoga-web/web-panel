export interface UPI2AccountType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    datetime: string;
    data: {
      result: {
        account_details: {
          account_ifsc: string;
          account_number: string;
          amount_deposited: string;
        };
        digital_payment_details: {
          digital_payment_id: string;
          account_holder_name: string;
        };
      };
      status: number;
      message: string;
      api_name: string;
      billable: boolean;
      api_category: string;
    };
  }[];
}
