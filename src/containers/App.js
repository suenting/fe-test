import React, { Component } from 'react';
import './bootstrap.css';
import './App.css';
import Post from '../components/Post';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoaded: false,
      isError: false,
      filterText: '',
      posts: undefined
    };
  }

  componentDidMount() {
    let userPromise = fetch('https://jsonplaceholder.typicode.com/users')
      .then(result => result.json());
    let postsPromise = fetch('https://jsonplaceholder.typicode.com/posts')
      .then(result => result.json());
    Promise.all([userPromise, postsPromise]).then(result => {
      let users = result[0];
      let posts = result[1];
      let merged = [];
      let findUser = function (userId) {
        for (let it = 0; it < users.length; ++it) {
          if (users[it].id === userId) {
            return users[it];
          }
        }
        return undefined;
      }
      posts.forEach((post) => {
        post.user = findUser(post.userId);
        merged.push(post);
      });

      this.setState({
        isLoaded: true,
        posts: merged
      });
    })
      .catch(error => {
        this.setState({
          isError: true,
          isLoaded: true,
        });
      });
  }

  onChangeHandler(e) {
    this.setState({
      filterText: e.target.value,
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div className="container padTop">Loading...</div>);
    }
    if (this.state.isError) {
      return (<div id="error" className="container padTop">Failed to load messages, please ensure you're connected to the internet.</div>);
    }

    let listPosts = function(x,index){
      return <Post key={index} message={x}></Post>;
    };

    let filteredPosts = [];
    this.state.posts.forEach((post)=>{
      // ignore case on filter
      let filter = this.state.filterText.toLowerCase();
      if("" === filter){
        filteredPosts.push(post);
        return;
      }
      // assumption filter on all displayed fields
      if(
        post.user.name.toLowerCase().includes(filter) ||
        post.user.email.toLowerCase().includes(filter) ||
        post.user.address.city.toLowerCase().includes(filter) ||
        post.title.toLowerCase().includes(filter) ||
        post.body.toLowerCase().includes(filter))
        {
          filteredPosts.push(post);
        }
    });

    return (
      <div className="container padTop">
        <input type="text" className="form-control" onChange={this.onChangeHandler.bind(this)} aria-describedby="filterPosts" placeholder="Filter posts by keyword"></input>
        <br />
        <div id="postsContainer">
          {filteredPosts.map(listPosts)}
        </div>
      </div>
    );
  }
}

export default App;
