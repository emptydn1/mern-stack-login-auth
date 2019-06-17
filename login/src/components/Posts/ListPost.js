import React, { Component } from 'react';
import AddPost from './AddPost';
import Post from './Post';
import Loading from './Loading';
import { getPosts } from '../../actions/post.js'
import { connect } from 'react-redux';

class ListPost extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        const { list, loading } = this.props

        const items = list && list.map((value, key) => {
            return (
                <Post
                    key={key}
                    value={value}
                />
            )
        })
        
        return (
            <div>
                <AddPost />
                { loading ? <Loading /> : items }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        list: state.post.list,
        loading: state.post.loading
    }
}

export default connect(mapStateToProps, { getPosts })(ListPost);