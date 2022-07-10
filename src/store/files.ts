/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const filesSlice = createSlice({
    name: 'files',
    initialState: { files: [], selected: [], hierarchy: <any>[], lastPopped: {}, uploaded: <any>[] },
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setHierarchy: (state, action) => {
            if (action.payload.type === 'pop') {
                state.lastPopped = state.hierarchy.pop();
            } else if (action.payload.type === 'forward') {
                state.hierarchy.push(state.lastPopped);
            } else if (action.payload.type === 'clear') {
                state.hierarchy = [];
            } else if (action.payload.type === 'push') {
                state.hierarchy.push(action.payload.content);
            } else if (action.payload.type === 'replace') {
                state.hierarchy.splice(current(state).hierarchy.indexOf(action.payload.content) + 1);
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
        setUploadedFailed: (state, action) => {
            let index = 0;
            state.uploaded.forEach((item: any, i: any) => {
                if (item.name === action.payload.name) {
                    index = i;
                }
            });

            state.uploaded[index].status = 'failed';
        },
    },
});

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
