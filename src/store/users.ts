/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [], selectedUsers: [], user: null },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setSelectedUsers: (state, action) => {
            state.selectedUsers = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
