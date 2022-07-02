import React, { useEffect, useContext } from 'react'
import { AppContext } from '../../Context'
import config from '../../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

export default function Post() {

  const { posts, setPosts } = useContext(AppContext);

  useEffect(() => {
    fetch(ApiUrl + `/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='posts'>
        {posts.map(post => {
          return (
            <div className='post' key={post.post_id}>
              <div className='title'>{post.title}</div>
              <div className='content'>{post.content}</div>
              <div className='author'>Author: {post.user}</div>
              <hr/>
            </div>
          )
        })}
    </div>
  )
}
