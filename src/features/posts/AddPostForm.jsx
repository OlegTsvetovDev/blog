import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'


function AddPostForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState(0)
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')


    const canSave = Boolean(title)
        && Boolean(content)
        && Boolean(userId)
        && addRequestStatus === 'idle'

    const handleSavePost = (e) => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(
                    addNewPost({
                        title,
                        body: content,
                        userId
                    })
                ).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.log('Failed to save the post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h3>Create a new post</h3>            
            <form>
                <label htmlFor="postUser"></label>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}                    
                />
                <select name="postAuthor" id="postAuthor"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option value="0">Select Author</option>
                    {userOptions}
                </select>
                <label htmlFor="postConte">Post Content:</label>
                <textarea type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={handleSavePost}
                    disabled={!canSave}
                >
                    Add Post
                </button>
            </form>
        </section>
    )
}


export default AddPostForm