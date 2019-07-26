import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { variant } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "../authStyles";

export interface IAuthOwnProps extends WithStyles<typeof styles>, RouteComponentProps {

}

export interface IAuthStateProps {
    authToken: string | null;
    authUser: firebase.User | null;
}

export type AuthProps = IAuthOwnProps & IAuthStateProps;
