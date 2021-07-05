import React from 'react'

const Posts = props => {
 
 console.log(props)


    return (
      <div>
         <div className="post-container">
        <h1>Posts</h1>
      {props.posts.map(post => (
          <div key={post.id} className="user-card"> 
            <p>{post.text}</p>
           
          </div>
      ))}
    </div>
      </div>
    )

}

export default Posts
