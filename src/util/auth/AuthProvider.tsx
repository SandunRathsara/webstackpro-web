import { FC, PropsWithChildren } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession();

  const logout = () =>
    window.location.replace(
      `http://localhost:8080/realms/webstackpro/protocol/openid-connect/logout?id_token_hint=${data
        ?.token.idToken}&post_logout_redirect_uri=${encodeURI(
        "http://localhost:3000",
      )}`,
    );

  if (data === null) signIn("keycloak");
  else {
    return (
      <>
        <Button
          onClick={() => {
            signOut();
            logout();
          }}
        >
          Logout
        </Button>
        {children}
      </>
    );
  }
};

export default AuthProvider;
