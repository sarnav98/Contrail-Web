import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import styles from "../authStyles";

export interface IAuthOwnProps extends WithStyles<typeof styles>, RouteComponentProps {

}

export interface IAuthStateProps {
    authToken: string | null;
}

export type IAuthProps = IAuthOwnProps & IAuthStateProps;
