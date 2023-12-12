import "./index.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/util/store";
import { ThemeProvider } from "@/util/theme";

const font = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <main className={font.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </ThemeProvider>
  );
}
