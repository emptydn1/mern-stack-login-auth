import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/index.js';
import { withRouter } from "react-router-dom";

const styles = theme => ({
    textField: {
        display: 'flex',
        width: 320
    },
    button: {
        margin: theme.spacing.unit,
        paddingTop: 13,
        paddingBottom: 13,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            login: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(userData, this.props.history);
    }

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <Paper className={classes.root}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        margin="normal"
                        variant="outlined"
                        value={this.state.email}
                        onChange={this.handleChange}
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false}
                    />
                    <TextField
                        label="Login"
                        className={classes.textField}
                        type="text"
                        name="login"
                        margin="normal"
                        variant="outlined"
                        value={this.state.login}
                        onChange={this.handleChange}
                        helperText={errors.login ? errors.login : ''}
                        error={errors.login ? true : false}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.password}
                        onChange={this.handleChange}
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false}
                    />
                    <TextField
                        label="Repeat Password"
                        name="password2"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        helperText={errors.password2 ? errors.password2 : ''}
                        error={errors.password2 ? true : false}
                    />
                    <Button variant="contained" type="submit" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Paper>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { registerUser })(withRouter(withStyles(styles)(Register)));