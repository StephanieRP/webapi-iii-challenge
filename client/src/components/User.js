import React from 'react'

const User = props => {
    console.log(props)

  return (
    <div>
        <h1>{props.activeUser.name}</h1>
      <div>{props.userPost.map(post => 
          (<p key={post.id}>{post.text}</p>)
      )}</div>    </div>
  )
}

export default User
