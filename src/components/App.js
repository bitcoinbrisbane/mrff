import React from "react";
import Router from "./Router";
import { SWRConfig } from "swr";
import gpib from "../apis/gpib";
import { AuthProvider } from "./Auth";
import "./App.scss";

const swrConfig = {
  fetcher: url => gpib.secure.get(url).then(res => res.data),
  shouldRetryOnError: false
};

const App = () => (
  <SWRConfig value={swrConfig}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </SWRConfig>
);

export default App;
