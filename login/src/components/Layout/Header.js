import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/index.js';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }
    

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.setState({ anchorEl: null });
        this.props.logoutUser();
    };

    buttonloggedIn = (open) => {
        if (this.props.auth.isAuthenticated) {
            return (
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            )
        }
        else {
            return (
                <div>
                    <Button variant="contained" component="span"><Link to="/">Home</Link></Button>
                    <Button variant="contained" component="span"><Link to="/register">Register</Link></Button>
                    <Button variant="contained" component="span"><Link to="/login">Login</Link></Button>
                </div>
            )
        }
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon>

                            </MenuIcon>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Photos
                        </Typography>
                            <div>
                                {this.buttonloggedIn(open)}
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Home</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
                                </Menu>
                            </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logoutUser }) (withStyles(styles)(Header));