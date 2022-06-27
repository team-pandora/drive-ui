/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: { open: false, content: '' },
    reducers: {
        setOpen: (state) => {
            state.open = !state.open;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
    },
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice.reducer;
