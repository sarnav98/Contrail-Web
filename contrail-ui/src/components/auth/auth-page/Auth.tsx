import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "../../../routes";
import { IAppReduxState } from "../../../store/store.types";
import styles from "../authStyles";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import * as types from "./auth.type";

class Auth extends Component<types.AuthProps, types.IAuthState> {
    public state = {
        shouldRedirect: false,
    };

    public componentDidMount() {
        const { authUser, authToken } = this.props;
        if (authUser && authToken) {
            this.initiateRedirect();
        }
    }

    public initiateRedirect = () => {
        this.setState({
            shouldRedirect: true,
        });
    }

    public render() {
        const { authUser, authToken, classes } = this.props;

        if (authUser && authToken && this.state.shouldRedirect) {
            return (
                <Redirect to={ROUTES.MAIN} />
            );
        }

        const renderLoginForm = () => <LoginForm initiateRedirect={this.initiateRedirect} />;
        const renderRegisterForm = () => <RegisterForm initiateRedirect={this.initiateRedirect} />;
        const redirectLogin = () => <Redirect to={ROUTES.LOGIN} />;

        return (
            <Router>
                <Grid container={true} component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item={true} xs={false} sm={5} md={7} className={classes.image}>
                        <CloudUploadOutlined color="secondary" className={classes.largeIcon} />
                        <Typography color="secondary" component="h1" variant="h3">
                            Contrail
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={7} md={5} className={classes.formContainer}>
                        <Switch>
                            <Route path={ROUTES.LOGIN} exact={true} render={renderLoginForm}/>
                            <Route path={ROUTES.REGISTER} exact={true} render={renderRegisterForm}/>
                            <Route path={ROUTES.ROOT} exact={true} render={redirectLogin} />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IAuthStateProps => {
    return {
        authToken: state.authState.authToken,
        authUser: state.authState.authUser,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Auth));
