import React from 'react'
import { Link } from 'react-router-dom'
const Users = (props) => {

    const goToPost = id => {
        props.getPost(id)
        props.getCurrentUser(id)
        props.history.push(`/users-post/${id}`)
    }
   console.log(props)
    return (
    <div className="user-container">
        <h1>Users</h1>
      {props.users.map(user => (
          <div key={user.id} className="user-card"> 
            <h2>{user.name}</h2>
            <button onClick={e => goToPost(user.id)}className="user-posts"> See my posts</button>
          </div>
      ))}
    </div>
  )
}

export default Users
