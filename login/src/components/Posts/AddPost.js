import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post.js'

const styles = theme => ({
    margin: {
        margin: 15,
        width: 600
    },
    button: {
        display: 'inline-block',
        margin: 20,
        // '&:hover': {
        //     color: '#0011'
        // }
    }
});

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            text: this.state.text
        }
        this.props.addPost(postData);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="TextField"
                    name='text'
                    onChange={this.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
                    Send
                </Button>
            </Paper>
        );
    }
}

export default connect(null, { addPost })(withStyles(styles)(AddPost));