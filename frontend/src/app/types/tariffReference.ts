export interface TariffReference {
    id: number;
    tariff_code: string;
    category: string;
    description: string;
    base_registration_fee: number;
    base_examination_fee: number;
    is_active: boolean;
  }