export interface CountScanType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    mobile_number: string;
    call_count: number;
    first_called_at: string;
    last_updated_at: string;
  };
}
