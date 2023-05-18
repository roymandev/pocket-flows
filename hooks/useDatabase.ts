import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { supabase } from "../utils/supabase";

export const useDatabase = () => {
  const user = useContext(UserContext);

  const getBalance = async () => {
    const { data: balance, error } = await supabase
      .from("balance")
      .select("amount")
      .eq("id", user.id)
      .limit(1)
      .single();

    return { balance: balance?.amount, error };
  };

  const addTransaction = async (amount: number) => {
    const { error } = await supabase.from("transaction").insert({
      user_id: user.id,
      amount,
    });

    return { error };
  };

  const getTransactions = async () => {
    const { data, error } = await supabase
      .from("transaction")
      .select(`id, amount, created_at`)
      .eq("user_id", user.id);

    return {
      error,
      transactions: data,
    };
  };

  return {
    getBalance,
    addTransaction,
    getTransactions,
  };
};
