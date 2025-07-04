export interface HoleheType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    results: {
      name: string;
      domain: string;
      method: string;
      frequent_rate_limit: boolean;
      rateLimit: boolean;
      exists: boolean;
      emailrecovery: string | null;
      phoneNumber: string | null;
      others: string | null;
    }[];
    metadata: {
      email: string;
      websites_checked: number;
      execution_time: number;
    };
    datetime: string;
  };
}
