import { StringValidation } from 'zod';

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
        gas_provider: string;
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
      code: string;
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
      code: string;
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
      data: string[];
    };
    iec_list: {
      data: [];
    };
    whatsapp_info: {
      data: {
        status: string;
        is_business: string;
      };
    };
    revoke_info: {
      data: {
        revoke_date: string;
        revoke_status: string;
      };
    };
    esic_info: {
      data: {
        ifsc: string;
        name: string;
        mobile: string;
        document: string;
        bank_name: string;
        uan_number: string;
        branch_name: string;
        esic_number: string;
        employer_code: string;
        employer_name: string;
        account_number: string;
        bank_account_status: string;
      }[];
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

export interface RazorPayUpiType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    count: number;
    datetime_list: string[];
    datetime: string;
    data: {
      UPI: boolean;
      BANK: string;
      CITY: string;
      IFSC: string;
      IMPS: boolean;
      MICR: string;
      NEFT: boolean;
      RTGS: boolean;
      STATE: string;
      SWIFT: string | null;
      BRANCH: string;
      CENTRE: string;
      ADDRESS: string;
      CONTACT: string;
      ISO3166: string;
      BANKCODE: string;
      DISTRICT: string;
    };
  };
}

export interface SingleUpiRes {
  success: boolean;
  upi_handle: string;
  platform: string;
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
    datetime: string;
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
      platform: string;
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
        datetime: string;
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
      bzsdtls: {
        gdes: string;
        hsncd: string;
      }[];
      bzgddtls: {
        gdes: string;
        hsncd: string;
      }[];
    };
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
      gender: string;
      esic_status: string;
      age: string;
      esic_number: string;
      name: string;
      employer_code: string;
      employer_name: string;
      mobile: string;
      uan_number: string;
      bank_name: string;
      branch_name: string;
      bank_account_status: string;
      date_of_birth: string;
      uhid_number: string;
      dispensary_name: string;
      disability_type: string;
      first_date_of_appointment: string;
      registration_date: string;

      employer_details: {
        email: string;
        state: string;
        mobile: string;
        address: string;
        pincode: string;
        district: string;
        employer_code: string;
        employer_name: string;
      };
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
      pan: [
        {
          serial_number: string;
          value: string;
        },
      ];
      voter_id: [
        {
          value: string;
          serial_number: string;
        },
      ];
      driving_license: [
        {
          value: string;
          serial_number: string;
        },
      ];
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
              InterestRate: string;
              DateOpened: string;
              DateReported: string;
              CreditLimit: string;
              LastPayment: string;
              WriteOffAmount: string;
              HighCredit: string;
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
              RepaymentTenure: string;
              InstallmentAmount: string;
              AssetClassification: string;
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
