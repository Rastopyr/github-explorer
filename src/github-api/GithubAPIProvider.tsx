import React, { useContext } from "react"
import { PropsWithChildren } from 'react';
import { githubService } from '../composition-root';
import { GithubService } from './github-service';

const GithubAPIProviderContext = React.createContext<GithubService | undefined>(undefined)

export const useGithubAPI = (): GithubService => {
    const service = useContext(GithubAPIProviderContext);

    if (!service) throw new Error("Github API Service not provided");

    return service;
}

export const GithubAPIProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return <GithubAPIProviderContext.Provider value={githubService}>
        {children}
    </GithubAPIProviderContext.Provider>
}
