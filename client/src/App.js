import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import Users from './components/Users'
import User from './components/User'
import Posts from './components/Posts'
class App extends Component {
constructor() {
  super();
  this.state= {
    users: [],
    posts: [],
    userPost: [],
    activeUser: []
  }
}
componentDidMount() {
  const url = 'https://webapi-iii-challenge-stephanie.herokuapp.com'
axios.get(`${url}/api/users`).then( res => {
  this.setState({
    users: res.data
  })
  console.log("Users:",res)
}).catch(err => {
  console.log('Something went wrong..', err)
})

axios.get(`${url}/api/posts`).then( res => {
  this.setState({
    posts: res.data
  })
  console.log("Posts:", res)
}).catch(err => {
  console.log('Something went wrong..', err)
})


}

getPost = id => {
  const url = 'https://webapi-iii-challenge-stephanie.herokuapp.com'
  axios.get(`${url}/api/users/userspost/${id}`).then( res => {
    this.setState({
      userPost: res.data,
    })
    console.log("User Posts:", res)
  }).catch(err => {
    console.log('Something went wrong..', err)
  })
  

}
getCurrentUser = id => {
  const url = 'https://webapi-iii-challenge-stephanie.herokuapp.com'
  axios.get(`${url}/api/users/${id}`).then( res => {
    this.setState({
      activeUser: res.data,
    })
    console.log("Active User:", res)
  }).catch(err => {
    console.log('Something went wrong..', err)
  })
  

}

  
 render() {
  return (
    <div className="App">
    <header>
    <nav>
    <NavLink to="/users">Users</NavLink>
    <NavLink to="/posts">Posts</NavLink>
    </nav>
  
    </header>
     <Route path="/users" render={props => (
       <Users  {...props} users={this.state.users} getPost={this.getPost} getCurrentUser={this.getCurrentUser}/>
     )} />
     <Route exact path="/users-post/:userid" render={props => (
       <User  {...props} userPost={this.state.userPost} activeUser={this.state.activeUser} />
     )} />

    <Route path="/posts" render={props => (
       <Posts  {...props} posts={this.state.posts} />
     )} />

    </div>
  )
 }
 
  }

export default withRouter(App);
