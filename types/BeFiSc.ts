export interface Mobile360Type {
  txnId: string;
  apiCategory: 'Fraud Check';
  apiName: 'Mobile 360';
  billable: true;
  message: 'Success';
  status: 1;
  result: {
    digitalPaymentIdInfo: {
      code: 'SUC';
      data: {
        name: string;
        branch: string;
        address: string;
        state: string;
        contact: string;
        city: string;
        centre: string;
        district: string;
        bank: string;
      };
    };
    lpgInfo: {
      code: 'SUC';
      data: Array<{
        gasProvider: 'Indane Gas' | 'Bharat Gas' | 'HP Gas';
        name: string;
        consumerDetails: {
          consumerMobile: string;
          consumerId: string;
          consumerStatus: string;
          consumerType: string;
        };
        address: string;
        distributorDetails: {
          distributorCode: string;
          distributorName: string;
          distributorContact: string;
          distributorAddress: string;
        };
      }>;
    };
    msmeInfo: {
      code: 'SUC';
      data: Array<{
        udyamNumber: string;
        enterpriseName: string;
      }>;
    };
    epfoInfo: {
      code: 'SUC';
      data: string[];
    };
    directorPanInfo: {
      code: 'SUC';
      data: string[];
    };
    dinInfo: {
      code: 'SUC';
      data: Array<{
        pan: string;
        data: {
          name: string;
          din: string;
        };
      }>;
    };
    telcoInfo: {
      code: 'SUC';
      data: {
        isValid: boolean;
        subscriberStatus: 'CONNECTED';
        connectionStatus: {
          statusCode: 'DELIVERED';
          errorCodeId: string;
        };
        connectionType: 'prepaid';
        msisdn: {
          msisdnCountryCode: 'IN';
          msisdn: string;
          type: 'MOBILE';
          mnc: string;
          imsi: string;
          mcc: string;
          mccMnc: string;
        };
        currentServiceProvider: {
          networkPrefix: string;
          networkName: string;
          networkRegion: string;
          mcc: string;
          mnc: string;
          countryPrefix: string;
          countryCode: string;
          countryName: string;
        };
        originalServiceProvider: {
          networkPrefix: string;
          networkName: string;
          networkRegion: string;
          mcc: string;
          mnc: string;
          countryPrefix: string;
          countryCode: string;
          countryName: string;
        };
        isRoaming: boolean;
        roamingServiceProvider: {
          networkPrefix: string;
          networkName: string;
          networkRegion: string;
          mcc: string;
          mnc: string;
          countryPrefix: string;
          countryCode: string;
          countryName: string;
        };
      };
    };
    mobileAgeInfo: {
      code: 'SUC';
      data: {
        isPorted: string;
        mobileAge: string;
        numberActive: string;
        numberValid: string;
        portedRegion: string;
        portedTelecom: string;
        region: string;
        roaming: string;
        telecom: string;
      };
    };
    gstList: {
      code: 'SUC';
      data: string[];
    };
    iecList: {
      code: 'NRF';
      data: [];
    };
    whatsappInfo: {
      code: 'SUC';
      data: {
        status: string;
        isBusiness: string;
      };
    };
    revokeInfo: {
      code: 'SUC';
      data: {
        revokeDate: string;
        revokeStatus: string;
      };
    };
    esicInfo: {
      code: 'NRF';
      data: [];
    };
    keyHighlights: {
      digitalPaymentIdName: string;
      gasConnectionFound: string;
      udyamNumbers: string[];
      gstNumbers: string[];
      dinNumbers: string[];
      esicNumber: [];
      ieCodes: [];
      connectionType: string;
      whatsappBusinessAccountStatus: string;
      ageOfMobile: string;
      activeStatus: string;
      revokeDate: string;
    };
  };
  datetime: string;
}

export interface UanHistoryType {
  txnId: string;
  apiCategory: string;
  apiName: string;
  billable: boolean;
  message: string;
  status: number;
  datetime: string;
  result: {
    name: string;
    dob: string;
    employmentHistory: {
      companyName: string;
      companyAddress: string;
    }[];
  };
}

export const dummyData: UanHistoryType = {
  txnId: '16ed1938-a85c-43a8-aa26-db68010b4e7e',
  apiCategory: 'Employment history',
  apiName: 'UAN',
  billable: true,
  message: 'Record found successfully',
  status: 1,
  datetime: '2023-11-17 04:07:25.614332',
  result: {
    name: 'RAMESH KUMAR',
    dob: '01/01/1900',
    employmentHistory: [
      {
        companyName: 'THOMSON DIGITAL',
        companyAddress:
          '129, NSEZ, NOIDA, GAUTAM BUDDHA NAGAR, NOIDA, UTTAR PRADESH, 201305',
      },
      {
        companyName: 'CREDENC WEB TECHNOLOGIES PRIVATE LIMITED',
        companyAddress:
          '2ND FLOOR, DLF CENTRE, SANSAD MARG, CENTRAL, DELHI, DELHI, 110001',
      },
      {
        companyName: 'GLOBAL CONTENT TRANSFORMATION (PVT) LTD.',
        companyAddress:
          '2310 DOON EXPRESS BUSINESS PARK, BUILDING 2000 SAHARANPUR ROAD, DEHRADUN, OPP. TRANSPORT NAGAR DEHRADUN, UTTARAKHAND, 248001',
      },
    ],
  },
};

export const mobile360DummyData: Mobile360Type = {
  txnId: '77d89227-0dbd-4778-8cfb-e224df2a80a6',
  apiCategory: 'Fraud Check',
  apiName: 'Mobile 360',
  billable: true,
  message: 'Success',
  status: 1,
  result: {
    digitalPaymentIdInfo: {
      code: 'SUC',
      data: {
        name: 'Ramesh Kumar',
        branch: 'Noida Branch',
        address: 'B-121, Sector-5,Noida-201301',
        state: 'UTTAR PRADESH',
        contact: '+911133996699',
        city: 'NOIDA',
        centre: 'Gautam Buddh Nagar',
        district: 'Gautam Buddh Nagar',
        bank: 'Paytm Payments Bank',
      },
    },
    lpgInfo: {
      code: 'SUC',
      data: [
        {
          gasProvider: 'Indane Gas',
          name: 'RAM KUMAR',
          consumerDetails: {
            consumerMobile: '6789999999',
            consumerId: '7500000001234567',
            consumerStatus: 'ACTIVE',
            consumerType: 'Single Bottle Connection',
          },
          address: '123 ABC Colony XYZ',
          distributorDetails: {
            distributorCode: '000987654',
            distributorName: 'GAYATRI INDANE SERVICE',
            distributorContact: '1800987654',
            distributorAddress: '456 MNOP Marg XYZ',
          },
        },
        {
          gasProvider: 'Bharat Gas',
          name: 'Sham Kumar',
          consumerDetails: {
            consumerMobile: '',
            consumerId: '1234567890',
            consumerStatus: '',
            consumerType: '',
          },
          address: '123 ABC Colony XYZ',
          distributorDetails: {
            distributorCode: '1234567',
            distributorName: 'CHANDAN GAS SERVICE',
            distributorContact: '',
            distributorAddress: '456 MNOP Marg XYZ',
          },
        },
        {
          gasProvider: 'HP Gas',
          name: 'Sham Kumar',
          consumerDetails: {
            consumerMobile: '',
            consumerId: '',
            consumerStatus: '',
            consumerType: '456 MNOP Marg XYZ',
          },
          address: '1XX ABC Colony GXXXX 123456',
          distributorDetails: {
            distributorCode: '1234567',
            distributorName: 'CHITRA GAS SERVICE',
            distributorContact: '',
            distributorAddress: '',
          },
        },
      ],
    },
    msmeInfo: {
      code: 'SUC',
      data: [
        {
          udyamNumber: 'UDYAM-MH-11-12345678',
          enterpriseName: 'M/S Ramesh Electronics',
        },
      ],
    },
    epfoInfo: {
      code: 'SUC',
      data: ['100004314123'],
    },
    directorPanInfo: {
      code: 'SUC',
      data: ['ABCPD1234E'],
    },
    dinInfo: {
      code: 'SUC',
      data: [
        {
          pan: 'ABCPD1234E',
          data: {
            name: 'Ramesh Kumar',
            din: '09812345',
          },
        },
      ],
    },
    telcoInfo: {
      code: 'SUC',
      data: {
        isValid: true,
        subscriberStatus: 'CONNECTED',
        connectionStatus: {
          statusCode: 'DELIVERED',
          errorCodeId: '',
        },
        connectionType: 'prepaid',
        msisdn: {
          msisdnCountryCode: 'IN',
          msisdn: '+919582773885',
          type: 'MOBILE',
          mnc: '109',
          imsi: '404109582773885',
          mcc: '404',
          mccMnc: '40410',
        },
        currentServiceProvider: {
          networkPrefix: '81302',
          networkName: 'Airtel',
          networkRegion: 'Delhi',
          mcc: '404',
          mnc: '109',
          countryPrefix: '+91',
          countryCode: 'IN',
          countryName: 'India',
        },
        originalServiceProvider: {
          networkPrefix: '95827',
          networkName: 'Vodafone',
          networkRegion: 'Delhi',
          mcc: '404',
          mnc: '109',
          countryPrefix: '+91',
          countryCode: 'IN',
          countryName: 'India',
        },
        isRoaming: false,
        roamingServiceProvider: {
          networkPrefix: '',
          networkName: '',
          networkRegion: '',
          mcc: '',
          mnc: '',
          countryPrefix: '',
          countryCode: '',
          countryName: '',
        },
      },
    },
    mobileAgeInfo: {
      code: 'SUC',
      data: {
        isPorted: 'Yes',
        mobileAge: '15 to 16 Years',
        numberActive: 'Yes',
        numberValid: 'Yes',
        portedRegion: 'Delhi',
        portedTelecom: 'Airtel ',
        region: ' Delhi',
        roaming: 'No',
        telecom: 'Vodafone ',
      },
    },
    gstList: {
      code: 'SUC',
      data: ['27ABCPD1234E1ZN'],
    },
    iecList: {
      code: 'NRF',
      data: [],
    },
    whatsappInfo: {
      code: 'SUC',
      data: {
        status: 'Account Found',
        isBusiness: '0',
      },
    },
    revokeInfo: {
      code: 'SUC',
      data: {
        revokeDate: '',
        revokeStatus: 'No',
      },
    },
    esicInfo: {
      code: 'NRF',
      data: [],
    },
    keyHighlights: {
      digitalPaymentIdName: 'Ramesh Kumar',
      gasConnectionFound: 'Yes',
      udyamNumbers: ['UDYAM-MH-11-12345678'],
      gstNumbers: ['27ABCPD1234E1ZN', '27ABCPD1234E1ZN'],
      dinNumbers: ['09812345'],
      esicNumber: [],
      ieCodes: [],
      connectionType: 'prepaid',
      whatsappBusinessAccountStatus: 'Non-business',
      ageOfMobile: '15 to 16 Years',
      activeStatus: 'Yes',
      revokeDate: '',
    },
  },
  datetime: '2024-12-24 07:15:53.41087',
};
