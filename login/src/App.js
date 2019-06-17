import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Main from './components/Layout/Main';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { logoutUser, getCurrentUser } from './actions/index.js';
import setAuthorizeHeader from './utils/setAuthorizeHeader.js';


class App extends Component {
    componentDidMount() {
        if (localStorage.getItem('jwt')) {
            var decoded = jwt_decode(localStorage.getItem('jwt'));
            var currentTime = Date.now / 1000;
            if (currentTime > decoded.exp) {
                this.props.logoutUser();
            } else {
                setAuthorizeHeader(localStorage.getItem('jwt'));
                this.props.getCurrentUser();
            }
        }
    }

    render() {
        return (
            <div>
                <Main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Main>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

export default connect(mapStateToProps, { logoutUser, getCurrentUser })(App);
