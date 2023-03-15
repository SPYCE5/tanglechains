import * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AnalyticsProvider } from "../components/analytics/AnalyticsProvider";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <AnalyticsProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AnalyticsProvider>
  );
}

export default App;
