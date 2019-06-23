import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles'
import styles from './styles'

class RegisterForm extends Component {
    render() {
    const { classes, toggleForm } = this.props

        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="displayName"
                label="Username"
                name="displayName"
                autoComplete="username"
                autoFocus
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign Up
                </Button>
                <Grid container>
                <Grid item>
                    <Link href="#" variant="body2" onClick={toggleForm}>
                    {"Already have an account? Log In"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
        </Container>
        );
    }
}

export default withStyles(styles)(RegisterForm)