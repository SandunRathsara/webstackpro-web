export function keycloakLogout(idToken: string) {
  window.location.replace(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${
      process.env.NEXT_PUBLIC_KEYCLOAK_REALM
    }/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURI(
      process.env.NEXT_PUBLIC_URL || "",
    )}`,
  );
}
