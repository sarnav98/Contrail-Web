import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as auth from "../../../firebase/controllers/authController";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import styles from "../authStyles";
import * as types from "./registerForm.type";

class RegisterForm extends Component<types.RegisterFormProps, types.IRegisterFormState> {

    public state: types.IRegisterFormState = {
        values: {
            displayName: "",
            email: "",
            password: "",
        },
        formErrors: {
            displayNameError: "",
            emailError: "",
            passwordError: "",
        },
        isFormValid: false,
        isRegisteringUser: false,
    };

    // Checks if the input to the form is valid. If so, enable the signup button.
    public isFormValid = (errors: types.IFormErrors): boolean => {
        const { displayName, email, password } = this.state.values;
        let valid = true;

        if (displayName.trim().length === 0 || email.trim().length === 0 || password.length === 0) {
            valid = false;
        }

        Object.values(errors).forEach((val) => {
            return (val.length > 0 && (valid = false));
        });

        return valid;
    }

    // On-text-change listener to set any form errors.
    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        event.preventDefault();

        const { name, value } = event.target;
        const formErrors: types.IFormErrors = this.state.formErrors;

        switch (name) {
            case "displayName":
                formErrors.displayNameError = value.trim().length >= auth.MIN_DISPLAY_NAME_LENGTH
                    ? ""
                    : auth.DISPLAY_NAME_LENGTH_ERROR;
                break;
            case "email":
                formErrors.emailError = auth.emailRegex.test(value.trim())
                    ? ""
                    : auth.EMAIL_REGEX_ERROR;
                break;
            case "password":
                const passwordLengthError = value.length >= auth.MIN_PASSWORD_LENGTH
                    ? ""
                    : auth.PASSWORD_LENGTH_ERROR;
                const passwordRegexError = auth.passwordRegex.test(value)
                    ? ""
                    : auth.PASSWORD_NO_WHITESPACE;
                formErrors.passwordError = passwordLengthError.concat(passwordRegexError);
                break;
            default:
                break;
        }

        const isValid: boolean = this.isFormValid(formErrors);

        this.setState({
            values: {
                ...this.state.values,
                [name]: value,
            },
            formErrors,
            isFormValid: isValid,
        });
    }

    // Handle the signup button click.
    public handleSubmit = () => {
        const { displayName, email, password } = this.state.values;
        this.setState({
            isRegisteringUser: true,
        });

        auth.registerUser(displayName, email, password)
            .then(() => {
                this.props.setSnackbarDisplay("success", `Registration successful. \
                An email has been sent to ${email} for verification.`);
                this.setState({
                    isRegisteringUser: false,
                });
            }).catch((error) => {
                this.props.setSnackbarDisplay("error", error);
                this.setState({
                    isRegisteringUser: false,
                });
            });
    }

    public render() {
        const { classes } = this.props;
        const { displayName, email, password } = this.state.values;
        const { displayNameError, emailError, passwordError } = this.state.formErrors;

        const buttonContent = this.state.isRegisteringUser ?
        <CircularProgress size={20} className={classes.circleProgress} /> :
        "Sign Up";

        return (
            <Container maxWidth="sm">
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Register
                </Typography>
                    <form className={classes.form} noValidate={true}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            id="displayName"
                            label="Username"
                            name="displayName"
                            autoComplete="username"
                            value={displayName}
                            autoFocus={true}
                            error={displayNameError.length > 0}
                            helperText={displayNameError}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            error={emailError.length > 0}
                            helperText={emailError}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            error={passwordError.length > 0}
                            helperText={passwordError}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="button"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.state.isFormValid || this.state.isRegisteringUser}
                            onClick={this.handleSubmit}
                        >
                            {buttonContent}
                        </Button>
                        <Grid container={true}>
                            <Grid item={true}>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    {"Already have an account? Log In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        );
    }
}

export default withSnackbar(withStyles(styles)(RegisterForm));
