import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import { CssBaseline } from "@mui/material";
import { BaseComponent } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <BaseComponent>
        <CssBaseline />
        <Component {...pageProps} />
      </BaseComponent>
    </Provider>
  );
}
