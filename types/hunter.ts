export interface HunterVerifyType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    data: {
      data: {
        block: boolean;
        email: string;
        score: number;
        regexp: boolean;
        result: string; // deprecated, use 'status'
        status: string;
        sources: {
          uri: string;
          domain: string;
          extracted_on: string;
          last_seen_on: string;
          still_on_page: boolean;
        }[];
        webmail: boolean;
        gibberish: boolean;
        accept_all: boolean;
        disposable: boolean;
        mx_records: boolean;
        smtp_check: boolean;
        smtp_server: boolean;
        _deprecation_notice: string;
      };
      meta: {
        params: {
          email: string;
        };
      };
    };
    success: boolean;
  };
}
