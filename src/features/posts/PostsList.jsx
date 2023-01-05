import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAllPosts, selectPostsError, selectPostsStatus, fetchPosts } from './postsSlice'
import AddPostForm from './AddPostForm'
import PostsExcerpt from './PostsExcerpt'



const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsError = useSelector(selectPostsError)
    const postsStatus = useSelector(selectPostsStatus)

    useEffect(() => {
        if (postsStatus === 'idle')
            dispatch(fetchPosts())
    }, [dispatch, postsStatus])

    let content
    switch (postsStatus) {
        case 'loading': {
            content = <p>Loading</p>
            break
        }
        case 'failed': {
            content = <p>{postsError}</p>
            break
        }            
        default: {
            const ordredPosts = posts.slice().sort(
                (a, b) => b.date.localeCompare(a.date)
            )

            content = ordredPosts.map(
                (post) => <PostsExcerpt key={post.id} post={post} />
            )
        }
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}      
        </section>
    )
}


export default PostsList