import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import axios from 'axios'
class App extends Component {
constructor() {
  super();
  this.state= {
    users: []
  }
}
componentDidMount() {
  const url = 'https://webapi-iii-challenge-stephanie.herokuapp.com'
axios.get(`${url}/api/users`).then( res => {
  this.setState({
    users: res.data
  })
  console.log(res)
}).catch(err => {
  console.log('Something went wrong..', err)
})
}
  
 render() {
   console.log(this.state.users)
  return (
    <div className="App">
     Main app
    </div>
  )
 }
 
  }

export default App;
