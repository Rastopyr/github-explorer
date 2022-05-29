import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { GithubAPIProvider } from "./github-api/GithubAPIProvider";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not provided for React");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <GithubAPIProvider>
      <App />
    </GithubAPIProvider>
  </StrictMode>
);
