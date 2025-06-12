export interface BreachInfoType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    success: boolean;
    data: {
      List: {
        [sourceName: string]: {
          Data: Array<{
            Email?: string;
            Password?: string;
            Address?: string;
            FullName?: string;
            NickName?: string;
            Url?: string;
          }>;
          InfoLeak: string;
          NumOfResults: number;
        };
      };
      NumOfDatabase: number;
      NumOfResults: number;
      free_requests_left: number;
      price: number;
      'search time': number;
    };
  };
}
