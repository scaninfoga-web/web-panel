export interface HudsonResponseType {
  responseStatus: {
    message: string;
    status: string;
  };
  responseData: {
    _id: string;
    stealer: 'IN[6570B11A13B4BB85CBE8D979F8AE1EC1] [2022-04-12T21_58_55.5096687]';
    stealerFamily: string;
    dateUploaded: string;
    employeeAt: string[];
    clientAt: string[];
    dateCompromised: string;
    ip: string;
    computerName: string;
    operatingSystem: string;
    malwarePath: string;
    antiviruses: string[];
    credentials: {
      url: string;
      domain: string;
      username: string;
      password: string;
      type: string;
    }[];
  };
}

export interface HudsonEmailType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    message: string;
    stealers: {
      total_corporate_services: number;
      total_user_services: number;
      date_compromised: string; // ISO date string
      computer_name: string;
      operating_system: string;
      malware_path: string;
      antiviruses: string[];
      ip: string;
      top_passwords: string[];
      top_logins: string[];
    }[];
    total_corporate_services: number;
    total_user_services: number;
  };
}
