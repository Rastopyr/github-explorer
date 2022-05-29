import React, { useContext, useEffect, useLayoutEffect } from "react";
import { ServerReadyStateNotifier as BaseServerReadyStateNotifier } from "./server-ready-state-notifier";
import { serverReadyStateNotifier } from "../composition-root";

type ServerReadyStateNotifier = Omit<BaseServerReadyStateNotifier, "on">;

export const ServerReadyStateContext = React.createContext<ServerReadyStateNotifier | undefined>(undefined);

export const useServerSideLoadingComponent = (key: string, isLoading: boolean) => {
    const service = useContext(ServerReadyStateContext);

    if (!service) throw new Error('ServerReadyStateContext value not provided');

    useEffect(() => {
        service.registerDataLoading(key);
    }, []);

    useLayoutEffect(() => {
        if (!isLoading) return;

        service.resolveDataLoading(key);
    } ,  [isLoading]);
}

export const ServerReadyStateProvider: React.FC = ({ children }) => {
    return <ServerReadyStateContext.Provider value={serverReadyStateNotifier}>
        {children}
    </ServerReadyStateContext.Provider>
}; 
