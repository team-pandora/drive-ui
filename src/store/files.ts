/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
    name: 'files',
    initialState: { selected: [] },
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
    },
});

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
