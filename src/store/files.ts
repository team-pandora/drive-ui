/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
    name: 'files',
    initialState: { selected: [], hierarchy: <any>[], uploaded: <any>[] },
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
        setUploaded: (state, action) => {
            state.uploaded = action.payload;
        },
        setUploadedDone: (state, action) => {
            let index = 0;
            state.uploaded.forEach((item: any, i: any) => {
                if (item.name === action.payload.name) {
                    index = i;
                }
            });

            state.uploaded[index].status = 'done';
        },
    },
});

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
