import React, { Component } from 'react';
import './Post.css';

class Post extends Component {

  render() {
    return (
      <div className="container post">
        <div className="row">
          <div className="col">
            <img className="rounded-circle" alt="userimg" src="https://via.placeholder.com/75" />
          </div>
          <div className="col-10 user">
            {this.props.message.user.name} <br />
            {this.props.message.user.email} | {this.props.message.user.address.city}<br />          
          </div>
        </div>
        <strong>{this.props.message.title}</strong><br />
        <p>{this.props.message.body}</p>
      </div>
    );
  }
}
export default Post;
