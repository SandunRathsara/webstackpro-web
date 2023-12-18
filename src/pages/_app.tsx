import "./index.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/util/store";
import { ThemeProvider } from "@/util/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/util/auth/AuthProvider";

const font = Open_Sans({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider>
            <Provider store={store}>
              <main className={font.className}>
                <Component {...pageProps} />
              </main>
            </Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
