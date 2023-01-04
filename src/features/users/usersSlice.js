import { createSlice } from "@reduxjs/toolkit";


const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = [
    { id: 1, name: 'Dude Lebovski' },
    { id: 2, name: 'Neil Yang' },
    { id: 3, name: 'Dave Gray' },
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

const selectAllUsers = (state) => state.users


export {
    selectAllUsers
}

export default usersSlice.reducer