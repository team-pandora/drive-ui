/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
    name: 'files',
    initialState: { selected: [], hierarchy: <any>[] },
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setHierarchy: (state, action) => {
            if (action.payload === 'pop') {
                state.hierarchy.pop();
            } else if (action.payload === 'clear') {
                state.hierarchy = [];
            } else {
                state.hierarchy.push(action.payload);
            }
        },
    },
});

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
