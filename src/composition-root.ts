import { createHTTPTransportAPIService } from './github-api/transport-api-service';
import { createGithubService } from "./github-api/github-service";
import { createServerReadyStateNotifier } from './server/server-ready-state-notifier';

// ==== github ====
export const transportAPIService = createHTTPTransportAPIService()
export const githubService = createGithubService(transportAPIService)

// ==== serverside rendered ====

export const serverReadyStateNotifier = createServerReadyStateNotifier()

serverReadyStateNotifier.on("loaded", () => {
    console.log("server, im ready!!!");
})
