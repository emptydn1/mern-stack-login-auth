import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core/CircularProgress';

const styles = {
    load: {
        textAlign: 'center',
        margin: 10,
        width: 700
    },
    loadIcon: {
        color: '#8A2BE2'
    }
}

class Loading extends Component {
    render() {
        var { classes } = this.props
        return (
            <div className={classes.load}>
                <CircularProgress
                    className={classes.loadIcon}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Loading)