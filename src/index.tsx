import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { GithubAPIProvider } from "./github-api/GithubAPIProvider";
import { ServerReadyStateProvider } from "./server/ServerReadyStateProvider";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not provided for React");

const root = ReactDOMClient.createRoot(rootElement);

console.log("Start rendering");

root.render(
  <StrictMode>
    <ServerReadyStateProvider>
      <GithubAPIProvider>
        <App />
      </GithubAPIProvider>
    </ServerReadyStateProvider>
  </StrictMode>
);
