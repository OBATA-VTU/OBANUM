
export interface TalkDroveNumber {
  id: number;
  phone_number: string;
  country: string;
  created_at: string;
  updated_at?: string;
  full_number?: string; // Sometimes APIs return variants
}

export interface TalkDroveOTP {
  id: number;
  phone_number: string;
  otp_code: string;
  message?: string; // Sometimes mapped as sms_text
  sms_text?: string; // API variant
  platform: string;
  country?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  links?: any;
  meta?: any;
}
