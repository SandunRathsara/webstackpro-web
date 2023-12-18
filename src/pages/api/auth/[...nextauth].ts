import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: "backend-client",
      clientSecret: "8FtrtH8SSGrIAr6DSFoZdySX10qYOvNU",
      issuer: "http://localhost:8080/realms/webstackpro",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      return { ...session, token };
    },
  },
});
