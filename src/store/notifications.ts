/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: { simpleOpen: false, content: '', uploadOpen: false },
    reducers: {
        setSimpleOpen: (state) => {
            state.simpleOpen = !state.simpleOpen;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setUploadOpen: (state) => {
            state.uploadOpen = !state.uploadOpen;
        },
    },
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice.reducer;
