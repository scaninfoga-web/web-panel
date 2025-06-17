export interface LeakHunterType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    email: string;
    password: string[];
  };
}

export interface JobSeekerType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    [key: string]: string;
  };
}
