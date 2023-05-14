import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { Redirect, Slot } from "expo-router";

const ProtectedRouteLayout = () => {
  const user = useContext(UserContext);

  if (!user) return <Redirect href="/" />;

  return <Slot />;
};

export default ProtectedRouteLayout;
