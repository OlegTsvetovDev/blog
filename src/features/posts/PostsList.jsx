import React from 'react'
import { useSelector } from 'react-redux'
import AddPostForm from './AddPostForm'
import PostAuthor from './PostAuthor'
import { addReaction, selectAllPosts } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'



const PostsList = () => {
    const posts = useSelector(selectAllPosts)

    if (posts.length === 0)
        return (
            <p>Loading</p>
        )

    const orderedPosts = posts.slice().sort(
        (a, b) => b.date.localeCompare(a.date)
    )

    const renderedPosts = orderedPosts.map(
        (post) => (
            <article key={post.id}>
                <h3>{post?.title}</h3>
                <p>{post?.content.substring(0, 100)}</p>
                <p className="postCredit">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
            </article>
        )
    )
   

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}            
            <AddPostForm />
        </section>
    )
}


export default PostsList