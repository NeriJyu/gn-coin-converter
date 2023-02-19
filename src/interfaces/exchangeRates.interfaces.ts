export interface I_FindConvert {
  id: number;
  user_id: number;
  source_currency: string;
  origin_value: string;
  conversion_rate: string;
  date: string;
  destination_currency: string;
  target_value: number;
}
