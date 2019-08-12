import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchRootResources, setResourceListener } from "../../store/actions/resourceActions";
import { IResourceFetchAllAction } from "../../store/actions/resourceActions.types";
import { IAppReduxState } from "../../store/store.types";
import withSnackbar from "../feedback/snackbar-component/SnackbarComponent";
import ResourceListView from "./resource-list-view/ResourceListView";
import ResourceToolBar from "./resource-tool-bar/ResourceToolBar";
import * as types from "./resourceFrame.types";
import styles from "./resourceStyles";

class ResourceFrame extends Component<types.ResourceFrameProps, types.IResourceFrameState> {
    public state = {
        unsubscribeListener: () => null,
    };

    public componentDidMount() {
        this.props.fetchRootResources()
            .catch((error) => {
                this.props.setSnackbarDisplay("error", "Failed to load resources: " + error);
            });
        this.props.setResourceListener()
            .then((unsubscribe) => {
                this.setState({
                    unsubscribeListener: unsubscribe,
                });
            })
            .catch((error) => {
                this.props.setSnackbarDisplay("error", "Failed to sync resources: " + error);
            });
    }

    public componentWillUnmount() {
        this.state.unsubscribeListener();
    }

    public render() {
        const { classes } = this.props;
        const { userResources } = this.props;
        const { match } = this.props;
        const sharedResources = userResources.sharedBy.concat(userResources.sharedTo);

        const renderRootResources = (props: RouteComponentProps) => {
            return (
                <React.Fragment>
                    <ResourceToolBar titleText="Files" />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView {...props} display={userResources.root} />
                </React.Fragment>
            );
        };

        const renderFavouriteResources = (props: RouteComponentProps) => {
            return (
                <React.Fragment>
                    <ResourceToolBar titleText="Favourites" />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView {...props} display={userResources.favourites} />
                </React.Fragment>
            );
        };

        const renderSharedResources = (props: RouteComponentProps) => {
            return (
                <React.Fragment>
                    <ResourceToolBar titleText="Shared" />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView {...props} display={sharedResources} />
                </React.Fragment>
            );
        };

        const renderTrashResources = (props: RouteComponentProps) => {
            return (
                <React.Fragment>
                    <ResourceToolBar titleText="Trash" />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView {...props} display={userResources.trash} />
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <Switch>
                    <Route path={`${match.path}/files`} render={renderRootResources} />
                    <Route path={`${match.path}/favourites`} render={renderFavouriteResources} />
                    <Route path={`${match.path}/shared`} render={renderSharedResources} />
                    <Route path={`${match.path}/trash`} render={renderTrashResources} />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IResourceFrameStateProps => {
    return {
        isFetchingResources: state.appUiState.appLoadState.isFetchingRootResources,
        userResources: state.resourceState.userResources,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IResourceFetchAllAction>) => {
    return {
        fetchRootResources: () => dispatch(fetchRootResources()),
        setResourceListener: () => dispatch(setResourceListener()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(ResourceFrame)));
