import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./i18n";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./store";

const queryClient = new QueryClient(); //data manager for all the things that come back from the API. handle by this query client

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

document.body.style.overflow = "hidden";

root.render(
  <Suspense>
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
  </Suspense>
);
