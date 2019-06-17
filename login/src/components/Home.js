import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListPost from './Posts/ListPost';
import Login from './Auth/Login';

class Home extends Component {

    render() {
        return (
            <div>
                {this.props.auth ? <ListPost /> : <Login />}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Home);