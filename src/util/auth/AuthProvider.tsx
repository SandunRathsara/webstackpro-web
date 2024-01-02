import { FC, PropsWithChildren } from "react";
import { signIn, useSession } from "next-auth/react";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession();

  if (data === null) signIn("keycloak");

  else return children;
};

export default AuthProvider;
