export interface Transaction {
  id: number;
  user_id: number;
  order_id: number;
  reference_id: string;
  amount: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}