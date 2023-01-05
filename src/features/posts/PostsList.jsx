import React from 'react'
import { useSelector } from 'react-redux'

import { selectAllPosts, selectPostsError, selectPostsStatus } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'



const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const postsError = useSelector(selectPostsError)
    const postsStatus = useSelector(selectPostsStatus)


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