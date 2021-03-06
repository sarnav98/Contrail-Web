import * as constants from "../constants";
import * as actions from "./appUiStateActions.types";

/**
 * Sets the app's initial loading state for fetching the user.
 *
 * @param isLoading if the app is in the state of fetching the current user.
 * *NOTE*: This stops the initial loading screen from rendering.
 */
export const setAppUserLoadingState = (isLoading: boolean): actions.IAppSetUserLoadingAction => {
    return {
        type: constants.APP_SET_LOADING_USER_STATE,
        payload: isLoading,
    };
};

export const setAppUploadDialogOpen = (shouldDisplayDialog: boolean): actions.IAppSetUploadDialogOpenAction => {
    return {
        type: constants.APP_SET_UPLOAD_DIALOG_OPEN,
        payload: shouldDisplayDialog,
    };
};

export const setAppResourceLoadingState = (isLoading: boolean): actions.IAppSetResourceLoadingAction => {
    return {
        type: constants.APP_SET_LOADING_RESOURCE_STATE,
        payload: isLoading,
    };
};

export const setAppShareDialogOpen = (shouldDisplayDialog: boolean): actions.IAppSetShareDialogOpenAction => {
    return {
        type: constants.APP_SET_SHARE_DIALOG_OPEN,
        payload: shouldDisplayDialog,
    };
};
