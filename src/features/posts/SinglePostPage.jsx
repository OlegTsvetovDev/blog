import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { selectedPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'


const SinglePostPage = () => {
    const { postId } = useParams()
    const post = useSelector(
        (state) => selectedPostById(state, Number(postId))
    )    

    if (!post) return (
        <section>
            <h2>Post not found</h2>
        </section>
    )

    return (
        <article>
            <h3>{post?.title}</h3>
            <p>{post?.body?.substring(0, 100)}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${postId}`}>Edit</Link>
                <PostAuthor userId={post?.userId} />
                <TimeAgo timestamp={post?.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
      )
}


export default SinglePostPage
