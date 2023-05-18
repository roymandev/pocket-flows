export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      balance: {
        Row: {
          amount: number;
          id: string;
        };
        Insert: {
          amount?: number;
          id: string;
        };
        Update: {
          amount?: number;
          id?: string;
        };
      };
      transaction: {
        Row: {
          amount: number;
          created_at: string;
          id: number;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: number;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Transactions = Database["public"]["Tables"]["transaction"]["Row"];
