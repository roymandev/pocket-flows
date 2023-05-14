import { Button, Text } from "native-base";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { supabase } from "../../utils/supabase";

const home = () => {
  const user = useContext(UserContext);

  return (
    <>
      <Text>{user.email}</Text>
      <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
    </>
  );
};

export default home;
