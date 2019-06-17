import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index.js';

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/');
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
            password: this.state.password
        }
        this.props.loginUser(userData);
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
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { loginUser }) (withRouter(withStyles(styles)(Login)));