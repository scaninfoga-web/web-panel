export interface Mobile360Type {
  txn_id: string;
  api_category: 'Fraud Check';
  api_name: 'Mobile 360';
  billable: true;
  message: 'Success';
  status: number;
  datetime: string;
  result: {
    digital_payment_id_info: {
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
    lpg_info: {
      code: 'SUC';
      data: Array<{
        gas_provider: 'Indane Gas' | 'Bharat Gas' | 'HP Gas';
        name: string;
        consumer_details: {
          consumer_mobile: string;
          consumer_id: string;
          consumer_status: string;
          consumer_type: string;
        };
        address: string;
        distributor_details: {
          distributor_code: string;
          distributor_name: string;
          distributor_contact: string;
          distributor_address: string;
        };
      }>;
    };
    msme_info: {
      code: 'SUC';
      data: Array<{
        udyam_number: string;
        enterprise_name: string;
      }>;
    };
    epfo_info: {
      code: 'SUC';
      data: string[];
    };
    director_pan_info: {
      code: 'SUC';
      data: string[];
    };
    din_info: {
      code: 'SUC';
      data: Array<{
        pan: string;
        data: {
          name: string;
          din: string;
        };
      }>;
    };
    telco_info: {
      code: 'SUC';
      data: {
        is_valid: boolean;
        subscriber_status: string;
        connection_status: {
          status_code: string;
          error_code_id: string;
        };
        connection_type: string;
        msisdn: {
          msisdn_country_code: 'IN';
          msisdn: string;
          type: string;
          mnc: string;
          imsi: string;
          mcc: string;
          mcc_mnc: string;
        };
        current_service_provider: {
          network_prefix: string;
          network_name: string;
          network_region: string;
          mcc: string;
          mnc: string;
          country_prefix: string;
          country_code: string;
          country_name: string;
        };
        original_service_provider: {
          network_prefix: string;
          network_name: string;
          network_region: string;
          mcc: string;
          mnc: string;
          country_prefix: string;
          country_code: string;
          country_name: string;
        };
        is_roaming: boolean;
        roaming_service_provider: {
          network_prefix: string;
          network_name: string;
          network_region: string;
          mcc: string;
          mnc: string;
          country_prefix: string;
          country_code: string;
          country_name: string;
        };
      };
    };
    mobile_age_info: {
      code: 'SUC';
      data: {
        is_ported: string;
        mobile_age: string;
        number_active: string;
        number_valid: string;
        ported_region: string;
        ported_telecom: string;
        region: string;
        roaming: string;
        telecom: string;
      };
    };
    gst_list: {
      code: 'SUC';
      data: string[];
    };
    iec_list: {
      code: 'NRF';
      data: [];
    };
    whatsapp_info: {
      code: 'SUC';
      data: {
        status: string;
        is_business: string;
      };
    };
    revoke_info: {
      code: 'SUC';
      data: {
        revoke_date: string;
        revoke_status: string;
      };
    };
    esic_info: {
      code: 'NRF';
      data: [];
    };
    key_highlights: {
      digital_payment_id_name: string;
      gas_connection_found: string;
      udyam_numbers: string[];
      gst_numbers: string[];
      din_numbers: string[];
      esic_number: string[];
      ie_codes: [];
      connection_type: string;
      whatsapp_business_account_status: string;
      age_of_mobile: string;
      active_status: string;
      revoke_date: string;
    };
  };
}

export interface UPIType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    [upiId: string]: {
      success: boolean;
      upi_handle: string;
      platform: 'PhonePe';
      data: {
        txn_id: string;
        api_category: string;
        api_name: string;
        billable: boolean;
        message: string;
        status: number;
        result: {
          name: string;
          bank: string;
          branch: string;
          center: string;
          district: string;
          state: string;
          address: string;
          contact: string;
          city: string;
        };
        datetime: '2025-05-24 05:40:33.141852';
      };
    };
  };
}

export interface GstVerificationAdvanceType {
  api_category: string;
  api_name: string;
  billable: boolean;
  txn_id: string;
  message: string;
  status: number;
  datetime: string;
  result: {
    aggregate_turn_over: string;
    authorized_signatory: string[];
    business_constitution: string;
    business_details: {
      saccd: string;
      sdes: string;
    }[];
    business_nature: string[];
    can_flag: string;
    central_jurisdiction: string;
    compliance_rating: string;
    current_registration_status: string;
    filing_status: {
      fy: string;
      taxp: string;
      mof: string;
      dof: string;
      rtntype: string;
      arn: string;
      status: string;
    }[][];
    gstin: string;
    is_field_visit_conducted: string;
    legal_name: string;
    mandate_e_invoice: string;
    other_business_address: Record<string, unknown>;
    primary_business_address: {
      business_nature: string;
      detailed_address: string;
      last_updated_date: string;
      registered_address: string;
    };
    register_cancellation_date: string;
    register_date: string;
    state_jurisdiction: string;
    tax_payer_type: string;
    trade_name: string;
    gross_total_income: string;
    gross_total_income_financial_year: string;
    business_email: string;
    business_mobile: string;
  };
}

export interface VerifyUdyamType {
  api_category: string;
  api_name: string;
  billable: boolean;
  txn_id: string;
  message: string;
  status: number;
  datetime: string;
  result: {
    enterprise_name: string;
    organisation_type: string;
    service_type: string;
    gender: string;
    social_category: string;
    date_of_incorporation: string;
    date_of_commencement: string;
    address: {
      flat_no: string;
      building: string;
      village: string;
      block: string;
      street: string;
      district: string;
      city: string;
      state: string;
      pin: string;
    };
    mobile: string;
    email: string;
    plant_details: {
      unit_name: string;
      flat: string;
      building: string;
      village: string;
      block: string;
      road: string;
      district: string;
      city: string;
      state: string;
      pin: string;
    }[];
    enterprise_type: {
      classification_year: string;
      enterprise_type: string;
      classification_date: string;
    }[];
    nic_code: {
      nic_2_digit: string;
      nic_4_digit: string;
      nic_5_digit: string;
      activity: string;
      date: string;
    }[];
    dic: string;
    'msme-dfo': string;
    date_of_udyam_registeration: string;
  };
}

export interface GstTurnoverType {
  api_category: string;
  api_name: string;
  billable: boolean;
  txn_id: string;
  message: string;
  status: number;
  datetime: string;
  result: {
    gst_estimated_total: string;
    gst_filed_total: string;
    year: string;
    filing_date: string;
    pan_estimated_total: string;
    pan_filed_total: string;
    gst_status: string;
    legal_name: string;
    trade_name: string;
    register_date: string;
    tax_payer_type: string;
    authorized_signatory: string[];
    business_nature: string[];
  };
}

export interface EsicDetailsType {
  txn_id: string;
  api_category: string;
  api_name: string;
  billable: boolean;
  message: string;
  status: number;
  datetime: string;
  result: {
    esic_number: string;
    esic_details: {
      esic_number: string;
      name: string;
      employer_code: string;
      employer_name: string;
      mobile: string;
      uan_number: string;
      bank_name: string;
      branch_name: string;
      bank_account_status: string;
    }[];
  };
}

export interface ProfileAdvanceType {
  txn_id: string;
  api_category: string;
  api_name: string;
  billable: boolean;
  message: string;
  status: number;
  datetime: string;
  result: {
    personal_information: {
      full_name: string;
      gender: string;
      age: string;
      date_of_birth: string;
      income: string;
    };
    alternate_phone: {
      serial_number: string;
      value: string;
    }[];
    email: {
      serial_number: string;
      value: string;
    }[];
    address: {
      detailed_address: string;
      state: string;
      pincode: string;
      type: string;
      date_of_reporting: string;
    }[];
    document_data: {
      pan: {
        serial_number: string;
        value: string;
      }[];
    };
  };
}

export interface MobileToAccountNumberType {
  txn_id: string;
  api_category: string;
  api_name: string;
  billable: boolean;
  message: string;
  status: number;
  datetime: string;
  result: {
    account_details: {
      account_ifsc: string;
      account_number: string;
      amount_deposited: string;
    };
    vpa_details: {
      account_holder_name: string;
      vpa: string;
    };
  };
}

export interface EquifaxV3Type {
  api_category: string;
  api_name: string;
  billable: boolean;
  txn_id: string;
  message: string;
  status: number;
  datetime: string;
  result: {
    id_number: string;
    id_type: string;
    mobile: string;
    name: string;
    credit_score: string;
    credit_report: {
      InquiryResponseHeader: {
        ClientID: string;
        CustRefField: string;
        ReportOrderNO: string;
        ProductCode: string[];
        SuccessCode: string;
        Date: string;
        Time: string;
      };
      InquiryRequestInfo: {
        InquiryPurpose: string;
        TransactionAmount: string;
        FirstName: string;
        InquiryPhones: {
          seq: string;
          PhoneType: string[];
          Number: string;
        }[];
        IDDetails: {
          seq: string;
          IDType: string;
          Source: string;
        }[];
      };
      Score: {
        Type: string;
        Version: string;
      }[];
      CCRResponse: {
        CIRReportDataLst: {
          CIRReportData: {
            Enquiries: {
              Amount: string;
              Date: string;
              Institution: string;
              RequestPurpose: string;
              Time: string;
              seq: string;
            }[];
            EnquirySummary: {
              Past12Months: string;
              Past24Months: string;
              Past30Days: string;
              Purpose: string;
              Recent: string;
              Total: string;
            };
            IDAndContactInfo: {
              AddressInfo: {
                Address: string;
                Postal: string;
                ReportedDate: string;
                Seq: string;
                State: string;
                Type?: string;
              }[];
              EmailAddressInfo: {
                EmailAddress: string;
                ReportedDate: string;
                seq: string;
              }[];
              IdentityInfo: {
                OtherId: {
                  IdNumber: string;
                  ReportedDate: string;
                  seq: string;
                }[];
                PANId: {
                  IdNumber: string;
                  ReportedDate: string;
                  seq: string;
                }[];
              };
              PersonalInfo: {
                ' AliasName': object;
                Age: {
                  Age: string;
                };
                DateOfBirth: string;
                Gender: string;
                Name: {
                  FirstName: string;
                  FullName: string;
                  LastName: string;
                  MiddleName: string;
                };
                Occupation: string;
                PlaceOfBirthInfo: object;
                TotalIncome: string;
              };
              PhoneInfo: {
                Number: string;
                ReportedDate: string;
                seq: string;
                typeCode: string;
              }[];
            };
            OtherKeyInd: {
              AgeOfOldestTrade: string;
              AllLinesEVERWritten: string;
              AllLinesEVERWrittenIn6Months: string;
              AllLinesEVERWrittenIn9Months: string;
              NumberOfOpenTrades: string;
            };
            RecentActivities: {
              AccountsDeliquent: string;
              AccountsOpened: string;
              AccountsUpdated: string;
              TotalInquiries: string;
            };
            RetailAccountDetails: {
              AccountNumber: string;
              AccountStatus: string;
              AccountType: string;
              Balance: string;
              DateOpened: string;
              DateReported: string;
              History48Months: {
                AssetClassificationStatus: string;
                PaymentStatus: string;
                SuitFiledStatus: string;
                key: string;
              }[];
              Institution: string;
              LastPaymentDate: string;
              Open: string;
              OwnershipType: string;
              PastDueAmount: string;
              SanctionAmount: string;
              TermFrequency: string;
              seq: string;
              source: string;
            }[];
            RetailAccountsSummary: {
              AverageOpenBalance: string;
              MostSevereStatusWithIn24Months: string;
              NoOfAccounts: string;
              NoOfActiveAccounts: string;
              NoOfPastDueAccounts: string;
              NoOfWriteOffs: string;
              NoOfZeroBalanceAccounts: string;
              OldestAccount: string;
              RecentAccount: string;
              SingleHighestBalance: string;
              SingleHighestCredit: string;
              SingleHighestSanctionAmount: string;
              TotalBalanceAmount: string;
              TotalCreditLimit: string;
              TotalHighCredit: string;
              TotalMonthlyPaymentAmount: string;
              TotalPastDue: string;
              TotalSanctionAmount: string;
            };
            ScoreDetails: {
              Name: string;
              ScoringElements: {
                Description: string;
                code: string;
                seq: string;
                type: string;
              }[];
              Type: string;
              Value: string;
              Version: string;
            }[];
          };
          InquiryRequestInfo: {
            DOB: string;
            FirstName: string;
            Gender: string;
            IDDetails: {
              IDType: string;
              IDValue: string;
              seq: string;
            }[];
            InquiryAddresses: {
              AddressLine1: string;
              AddressType: string[];
              City: string;
              Postal: string;
              State: string;
              seq: string;
            }[];
            InquiryPhones: {
              Number: string;
              PhoneType: string[];
              seq: string;
            }[];
            InquiryPurpose: string;
            TransactionAmount: string;
          };
          InquiryResponseHeader: {
            CustRefField: string;
            CustomerCode: string;
            CustomerName: string;
            Date: string;
            HitCode: string;
            ProductCode: string[];
            ReportOrderNO: string;
            SuccessCode: string;
            Time: string;
          };
          Score: {
            Type: string;
            Version: string;
          }[];
        }[];
        Status: string;
      };
    };
  };
}

export interface PanAllInOneType {
  status: number;
  txn_id: string;
  message: string;
  api_name: string;
  billable: boolean;
  datetime: string;
  api_category: string;
  result: {
    dob: string;
    tax: boolean;
    email: string | null;
    fname: string;
    gender: string;
    address: {
      zip: string;
      city: string;
      full: string;
      state: string;
      line_1: string;
      line_2: string;
      country: string;
      street_name: string;
    };
    category: string;
    din_info: {
      din: string;
      company_list: any[];
      dinAllocationDate: string;
    };
    full_name: string;
    less_info: boolean;
    pan_number: string;
    is_director: {
      info: any[];
      found: string;
    };
    phone_number: string | null;
    aadhaar_linked: boolean;
    masked_aadhaar: string;
    full_name_split: [string, string, string];
    is_sole_proprietor: {
      info: any[];
      found: string;
    };
  };
}

export const dummyUdyamResponse: VerifyUdyamType = {
  api_category: 'Know Your Business (KYB)',
  api_name: 'Udyam',
  billable: true,
  txn_id: '123e4567-e89b-12d3-a456-426614174000',
  message: 'Record Found Successfully',
  status: 1,
  datetime: '2025-05-19 10:30:00.123456',
  result: {
    enterprise_name: 'ABC FOODS',
    organisation_type: 'Proprietary',
    service_type: 'Manufacturing',
    gender: 'Male',
    social_category: 'General',
    date_of_incorporation: '01/01/2015',
    date_of_commencement: '01/01/2015',
    address: {
      flat_no: 'A-101',
      building: 'Sunshine Residency',
      village: 'Sector 45',
      block: 'Main Block',
      street: 'Park Street',
      district: 'Gurgaon',
      city: 'Gurgaon',
      state: 'Haryana',
      pin: '122003',
    },
    mobile: '98*****321',
    email: 'abcfoods@example.com',
    plant_details: [
      {
        unit_name: 'ABC FOODS UNIT 1',
        flat: 'B-201',
        building: 'Industrial Plaza',
        village: 'Manesar',
        block: '',
        road: 'NH-8',
        district: 'Gurgaon',
        city: 'Gurgaon',
        state: 'Haryana',
        pin: '122051',
      },
    ],
    enterprise_type: [
      {
        classification_year: '2023-24',
        enterprise_type: 'Micro',
        classification_date: '01/04/2023',
      },
    ],
    nic_code: [
      {
        nic_2_digit: '10 - Manufacture of food products',
        nic_4_digit: '1071 - Manufacture of bakery products',
        nic_5_digit: '10711 - Manufacture of bread',
        activity: 'Manufacturing',
        date: '01/04/2023',
      },
      {
        nic_2_digit:
          '47 - Retail trade, except of motor vehicles and motorcycles',
        nic_4_digit: '4721 - Retail sale of food in specialized stores',
        nic_5_digit:
          '47214 - Retail sale of bakery products, dairy products and eggs',
        activity: 'Trading',
        date: '01/04/2023',
      },
    ],
    dic: 'GURGAON',
    'msme-dfo': 'DELHI',
    date_of_udyam_registeration: '01/04/2023',
  },
};

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

export const mobile_360_dummy_data: Mobile360Type = {
  txn_id: '77d89227-0dbd-4778-8cfb-e224df2a80a6',
  api_category: 'Fraud Check',
  api_name: 'Mobile 360',
  billable: true,
  message: 'Success',
  status: 1,
  result: {
    digital_payment_id_info: {
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
    lpg_info: {
      code: 'SUC',
      data: [
        {
          gas_provider: 'Indane Gas',
          name: 'RAM KUMAR',
          consumer_details: {
            consumer_mobile: '6789999999',
            consumer_id: '7500000001234567',
            consumer_status: 'ACTIVE',
            consumer_type: 'Single Bottle Connection',
          },
          address: '123 ABC Colony XYZ',
          distributor_details: {
            distributor_code: '000987654',
            distributor_name: 'GAYATRI INDANE SERVICE',
            distributor_contact: '1800987654',
            distributor_address: '456 MNOP Marg XYZ',
          },
        },
        {
          gas_provider: 'Bharat Gas',
          name: 'Sham Kumar',
          consumer_details: {
            consumer_mobile: '',
            consumer_id: '1234567890',
            consumer_status: '',
            consumer_type: '',
          },
          address: '123 ABC Colony XYZ',
          distributor_details: {
            distributor_code: '1234567',
            distributor_name: 'CHANDAN GAS SERVICE',
            distributor_contact: '',
            distributor_address: '456 MNOP Marg XYZ',
          },
        },
        {
          gas_provider: 'HP Gas',
          name: 'Sham Kumar',
          consumer_details: {
            consumer_mobile: '',
            consumer_id: '',
            consumer_status: '',
            consumer_type: '456 MNOP Marg XYZ',
          },
          address: '1XX ABC Colony GXXXX 123456',
          distributor_details: {
            distributor_code: '1234567',
            distributor_name: 'CHITRA GAS SERVICE',
            distributor_contact: '',
            distributor_address: '',
          },
        },
      ],
    },
    msme_info: {
      code: 'SUC',
      data: [
        {
          udyam_number: 'UDYAM-MH-11-12345678',
          enterprise_name: 'M/S Ramesh Electronics',
        },
      ],
    },
    epfo_info: {
      code: 'SUC',
      data: ['100004314123'],
    },
    director_pan_info: {
      code: 'SUC',
      data: ['ABCPD1234E'],
    },
    din_info: {
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
    telco_info: {
      code: 'SUC',
      data: {
        is_valid: true,
        subscriber_status: 'CONNECTED',
        connection_status: {
          status_code: 'DELIVERED',
          error_code_id: '',
        },
        connection_type: 'prepaid',
        msisdn: {
          msisdn_country_code: 'IN',
          msisdn: '+919582773885',
          type: 'MOBILE',
          mnc: '109',
          imsi: '404109582773885',
          mcc: '404',
          mcc_mnc: '40410',
        },
        current_service_provider: {
          network_prefix: '81302',
          network_name: 'Airtel',
          network_region: 'Delhi',
          mcc: '404',
          mnc: '109',
          country_prefix: '+91',
          country_code: 'IN',
          country_name: 'India',
        },
        original_service_provider: {
          network_prefix: '95827',
          network_name: 'Vodafone',
          network_region: 'Delhi',
          mcc: '404',
          mnc: '109',
          country_prefix: '+91',
          country_code: 'IN',
          country_name: 'India',
        },
        is_roaming: false,
        roaming_service_provider: {
          network_prefix: '',
          network_name: '',
          network_region: '',
          mcc: '',
          mnc: '',
          country_prefix: '',
          country_code: '',
          country_name: '',
        },
      },
    },
    mobile_age_info: {
      code: 'SUC',
      data: {
        is_ported: 'Yes',
        mobile_age: '15 to 16 Years',
        number_active: 'Yes',
        number_valid: 'Yes',
        ported_region: 'Delhi',
        ported_telecom: 'Airtel ',
        region: ' Delhi',
        roaming: 'No',
        telecom: 'Vodafone ',
      },
    },
    gst_list: {
      code: 'SUC',
      data: ['27ABCPD1234E1ZN'],
    },
    iec_list: {
      code: 'NRF',
      data: [],
    },
    whatsapp_info: {
      code: 'SUC',
      data: {
        status: 'Account Found',
        is_business: '0',
      },
    },
    revoke_info: {
      code: 'SUC',
      data: {
        revoke_date: '',
        revoke_status: 'No',
      },
    },
    esic_info: {
      code: 'NRF',
      data: [],
    },
    key_highlights: {
      digital_payment_id_name: 'Ramesh Kumar',
      gas_connection_found: 'Yes',
      udyam_numbers: ['UDYAM-MH-11-12345678'],
      gst_numbers: ['27ABCPD1234E1ZN', '27ABCPD1234E1ZN'],
      din_numbers: ['09812345'],
      esic_number: [],
      ie_codes: [],
      connection_type: 'prepaid',
      whatsapp_business_account_status: 'Non-business',
      age_of_mobile: '15 to 16 Years',
      active_status: 'Yes',
      revoke_date: '',
    },
  },
  datetime: '2024-12-24 07:15:53.41087',
};
