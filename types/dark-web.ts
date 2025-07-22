export interface DarkWebType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: Record<string, string>;
}
export interface ObjectArrayLeakType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: Array<Record<string, string>>;
}
