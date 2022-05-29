import { TransportAPIService } from './transport-api-service';

export type User = {
    readonly id: number;
    readonly login: string;
    readonly stars: number;
    readonly avatar_url: string;
};    

export type UserProfile = User & {
    readonly avatar_url: string;
    readonly followers: number;
}

export type Repo = {
    readonly id: number;
    readonly name: string;
    readonly stargazers_count: number;
    readonly description: string;
    readonly html_url: string;
};

export type SearchResult = {
    total_count: number;
    items: User[];
};

export type GithubService = {
    readonly findUsers: (usernameQuery: string) => Promise<SearchResult>;
    readonly getProfile: (username: string) => Promise<UserProfile | undefined>;
    readonly getUserRepos: (username: string) => Promise<readonly Repo[]>;
    readonly getUserStarredRepos: (username: string) => Promise<readonly Repo[]>;
}

export function createGithubService(apiService: TransportAPIService): GithubService {
    function findUsers(usernameQuery: string): Promise<SearchResult> {
        return apiService.request<SearchResult>(`search/users?q=${usernameQuery}`);
    }

    function getUser(username: string): Promise<UserProfile | undefined> {
        return apiService.request<UserProfile>(`users/${username}`);  
    }

    function getUserRepos(username: string): Promise<readonly Repo[]> {
        return apiService.request<readonly Repo[]>(`users/${username}/repos`);  
    }

    function getUserStarredRepos(username: string): Promise<readonly Repo[]> {
        return apiService.request<readonly Repo[]>(`users/${username}/starred`);  
    }

    return {
        findUsers,
        getProfile: getUser,
        getUserRepos,
        getUserStarredRepos
    }
}
