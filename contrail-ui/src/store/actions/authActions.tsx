
import * as firebase from "firebase/app";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { authRef } from "../../firebase/firebase";
import * as auth from "../../utils/firebase/auth-utils";
import * as constants from "../constants";
import { AppState } from "../reducers";

export interface IAuthFetchUser {
    type: constants.AUTH_USER_FETCH_USER;
    authUser: firebase.User;
    authToken: string;
}

export interface IAuthFetchUserError {
    type: constants.AUTH_USER_FETCH_USER_ERROR;
    fetchError: string;
}

export interface IAuthLoginUserError {
    type: constants.AUTH_USER_LOGIN_ERROR;
    loginError: string;
}
export interface IAuthUserLogoutError {
    type: constants.AUTH_USER_LOGOUT_ERROR;
    logoutError: string;
}

export type AuthTypes = IAuthFetchUser | IAuthFetchUserError
    | IAuthLoginUserError | IAuthUserLogoutError;

export const fetchUser = (
): ThunkAction<void, AppState, null, Action<string>> => (dispatch) => {
    authRef.onAuthStateChanged((user) => {
        if (user) {
            auth.getUserToken().then((token) => {
                dispatch({
                    type: constants.AUTH_USER_FETCH_USER,
                    authUser: user,
                    authToken: token,
                });
            });
        } else {
            dispatch({
                type: constants.AUTH_USER_FETCH_USER_ERROR,
                authUser: null,
                authToken: null,
            });
        }
    });
};

export const authUserLogin = (
    email: string, password: string,
): ThunkAction<void, AppState, null, Action<string>> => (dispatch) => {
    auth.loginUser(email, password)
        .catch((error) => {
            dispatch({
                type: constants.AUTH_USER_LOGIN_ERROR,
                error: { error },
            });
        });
};

export const authUserLogout = (
): ThunkAction<void, AppState, null, Action<string>> => (dispatch) => {
    auth.logoutUser()
        .catch((error) => {
            dispatch({
                type: constants.AUTH_USER_LOGIN_ERROR,
                error: { error },
            });
        });
};
