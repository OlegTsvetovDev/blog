import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
}

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)

    return response.data
})

const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)

    return response.data
})

const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { postId } = initialPost

    const response = await axios.put(`${POSTS_URL}/${postId}`, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            prepare: (title, content, userId) => ({
                payload: {
                    id: nanoid(),
                    title: title,
                    content: content,
                    userId: userId,
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            reducer: (state, action) => {
                state.posts.push(action.payload)
            },
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(
                (post) => post.id === postId
            )
            if (!existingPost)
                return new Error(`No post found with ID: ${postId}`)
            
            existingPost.reactions[reaction]++            
        },
        removePost: (state, action) => {
            state = state.posts.filter(
                (post) => post.id !== action.payload
            )
        },
        editPost: (state, action) => {             
            state = state.posts.map(
                (post) => post.id = action.payload.id
                    ? action.payload
                    : post
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let minutes = 1
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(
                        new Date(),
                        { minutes: minutes++ }
                    ).toISOString()

                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }

                    return post
                })

                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.data = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }

                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not be complete')
                    console.log(action.payload)
                    return
                }

                const { id } = action.payload
                action.payload.date = new Date().toISOString()
                const posts = state.posts.filter(
                    (post) => post.id !== id
                )
                state.posts = [...posts, action.payload]
            })
    }
})

const selectAllPosts = (state) => state.posts.posts
const selectPostsStatus = (state) => state.posts.status
const selectPostsError = (state) => state.posts.error
const selectedPostById = (state, postId) =>
    state.posts.posts.find((post) => postId === post.id)


export {
    selectAllPosts,
    selectPostsStatus,
    selectPostsError,
    selectedPostById,
}

export {
    fetchPosts,
    addNewPost,
    updatePost,
}

export const {
    addPost,
    addReaction,    
    removePost,
    editPost,
} = postsSlice.actions

export default postsSlice.reducer