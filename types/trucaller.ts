export interface TrucallerVerifyType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    data: Array<{
      [timestamp: string]: Array<{
        name: string;
        spam: boolean;
        names: Array<{
          name: string;
          isSpam: boolean;
          occurrences: number;
        }>;
        number: string;
        prefix: string;
        spamCounter: number;
      }>;
    }>;
    datetime: string[];
  };
}
