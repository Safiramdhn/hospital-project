export interface TariffReference {
    id: number;
    tariff_code: string;
    category: string;
    description: string;
    base_registration_fee: string;
    base_examination_fee: string;
    is_active: boolean;
  }