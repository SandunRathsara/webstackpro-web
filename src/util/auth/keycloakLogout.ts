export function keycloakLogout(idToken: string) {
  return fetch(
    `http://localhost:8080/realms/webstackpro/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=http://localhost:3000`,
    { method: "GET" },
  );
}
