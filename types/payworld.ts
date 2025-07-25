export interface PayWorldType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: [
    {
      datetime: string;
      data: {
        dob: string | null;
        city: string;
        name: string;
        state: string;
        gender: string;
        address: string;
        pincode: string;
        last_name: string;
        mobile_no: string;
        first_name: string;
        img_remark: string;
        img_status: string;
        kyc_remark: string;
        kyc_status: string;
        new_sender: number;
        pan_number: string;
        pan_remark: string;
        pan_status: string;
        proof_name: string;
        middle_name: string | null;
        is_junk_name: boolean;
        proof_number: string;
        provider_name: string;
        provider_order: string;
        add_bene_by_mpin: boolean;
        engine_sender_id: string;
        default_provider_id: number;
        total_monthly_limit: number;
        refresh_sender_limit: string;
        total_consumed_limit: number;
        total_available_limit: number;
        total_active_beneficiary: number;
        fetch_non_kyc_bene_status: number;
        total_deleted_beneficiary: number;
        total_inactive_beneficiary: number;
        add_non_kyc_bulk_bene_consent: string;
        max_count_to_add_non_kyc_bene: string;
        beneficiary_details: {
          bank: string;
          name: string;
          new_bene: number;
          bank_logo: string;
          ifsc_code: string;
          sender_id: number;
          account_number: string;
          beneficiary_id: number;
          is_international: number;
          last_validate_at: string;
          paysprint_bene_id: string;
          default_otp_verified: number;
          default_transfer_type: string[];
          provider_beneficiary_details: {
            provider_id: number;
            otp_verified: number;
            transfer_type: string[];
            engine_sender_id: string;
            provider_beneficiary_id: string;
          }[];
        }[];
        sender_provider_details: {
          sender_id: number;
          provider_id: number;
          otp_verified: number;
          monthly_limit: number;
          provider_name: string;
          onboard_status: string;
          provider_order: string;
          engine_sender_id: string;
          sender_details_id: number;
          provider_sender_id: string;
          monthly_consumed_limit: number;
        }[];
      };
    },
  ];
}
