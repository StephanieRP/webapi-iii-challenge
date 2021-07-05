import React from 'react'

const UserPost = props => {
    let { userid } = props.match.params
    console.log('UserPost Comp:', props.posts)

    const post =  props.posts.find(post => { return `${post.user_id}` === userid
        }
        )
    
  return (
    <div>
      <p>Test</p>
    </div>
  )
}

export default UserPost
