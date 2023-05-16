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

  return {
    getBalance,
  };
};
