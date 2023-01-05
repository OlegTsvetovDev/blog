import React from 'react'
import { Link } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'


const PostsExcerpt = ({ post }) => {
  return (
    <article>
        <h3>{post?.title}</h3>
        <p className="exrept">{post?.body?.substring(0, 75)}...</p>
        <p className="postCredit">
            <Link to={`posts/${post.id}`}>View full post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
    </article>
  )
}


export default PostsExcerpt