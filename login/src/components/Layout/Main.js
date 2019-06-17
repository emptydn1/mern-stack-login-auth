import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <Grid container justify="center">
                    <Grid item style={{ marginTop: 30}}>
                        {this.props.children}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Main;