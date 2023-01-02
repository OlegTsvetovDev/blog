import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = [
    { id: 1, title: 'Learning Redux Toolkit', content: 'The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux' },
    { id: 2, title: 'Learning React', content: 'What is React used for? It\'s used for building interactive user interfaces and web applications quickly and efficiently with significantly less code than you would with vanilla JavaScript' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId) => ({
                payload: {
                    id: nanoid(),
                    title: title,
                    content: content,
                    userId: userId
                }
            })
        },
        removePost: (state, action) => {
            state = state.filter(
                (post) => post.id !== action.payload
            )
        },
        editPost: (state, action) => {             
            state = state.map(
                (post) => post.id = action.payload.id
                    ? action.payload
                    : post
            )
        }
    }
})

const selectAllPosts = (state) => state.posts


export {
    selectAllPosts,    
}

export const {
    addPost,
    removePost,
    editPost,
} = postsSlice.actions

export default postsSlice.reducer