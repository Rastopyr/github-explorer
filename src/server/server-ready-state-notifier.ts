
type Unsubscribe = () => void;

export type ServerReadyStateNotifier = {
    readonly registerDataLoading: (key: string) => void;
    readonly resolveDataLoading: (key: string) => void;

    readonly on: (event: "loaded", callback: () => void) => Unsubscribe;
}

export function createServerReadyStateNotifier(): ServerReadyStateNotifier {
    const dataLoadingState: Record<string, boolean> = {};
    let loadedCallback: undefined | Unsubscribe;

    function registerDataLoading(key: string) {
        dataLoadingState[key] = false;
    }

    function resolveDataLoading(key: string) {
        dataLoadingState[key] = true

        if (!loadedCallback) {
            return;
        }

        const allIsLoaded = Object.values(dataLoadingState).every((value) => value === true)

        if (allIsLoaded) {
            loadedCallback()

            loadedCallback = undefined;
        }
    }
    
    function on(_: "loaded", callback: () => void): Unsubscribe {
        if  (loadedCallback) throw new Error("Loaded event already subscribed");

        loadedCallback = callback;

        return () => {
            loadedCallback = undefined
        }
    }


    return {
        registerDataLoading,
        resolveDataLoading,
        on
    }
}
