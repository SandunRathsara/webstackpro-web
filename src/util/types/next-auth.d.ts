import { Session as NASession } from "next-auth";

declare module "next-auth" {
  interface Session extends NASession {
    token: {
      accessToken: string;
      idToken: string;
    };
  }
}
