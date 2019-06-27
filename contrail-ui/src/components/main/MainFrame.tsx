import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import MainAppBar from "./main-app-bar/MainAppBar";
import MainDrawer from "./main-drawer/MainDrawer";
import MainView from "./main-view/MainView";
import styles from "./mainStyles";

class MainFrame extends Component <any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <MainAppBar />
                <MainDrawer />
                <MainView />
            </div>
        );
    }
}
export default withStyles(styles)(MainFrame);
