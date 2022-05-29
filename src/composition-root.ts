import { createHTTPTransportAPIService } from './github-api/transport-api-service';
import { createGithubService } from "./github-api/github-service";

// ==== github ====
export const transportAPIService = createHTTPTransportAPIService()
export const githubService = createGithubService(transportAPIService)
