export interface I_Transaction {
  id: number;
  user_id: number;
  source_currency: string;
  destination_currency: string;
  origin_value: string;
  conversion_rate: string;
  date: string;
}

export interface I_CreateTransaction {
  user_id: number;
  source_currency: string;
  destination_currency: string;
  origin_value: string;
  conversion_rate: string;
  date: string;
}
