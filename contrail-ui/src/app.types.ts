export interface IAppDispatchProps {
    setAuthListener: () => void;
    setNetworkState: (isConnected: boolean) => void;
}

export interface IAppStateProps {
    isLoading: boolean;
}

export type IAppProps = IAppDispatchProps & IAppStateProps;
