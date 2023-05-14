import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { Redirect, Slot } from "expo-router";

const AuthRouteLayout = () => {
  const user = useContext(UserContext);

  if (user) return <Redirect href="/home" />;

  return <Slot />;
};

export default AuthRouteLayout;
