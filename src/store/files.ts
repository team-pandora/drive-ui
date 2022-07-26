/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        files: [],
        selected: [],
        hierarchy: <any>JSON.parse(localStorage.getItem('hierarchy')!) || [],
        lastPopped: {},
        uploaded: <any>[],
        selectedPermission: 'write',
        parentFolderId:
            window.location.pathname.slice(1).split('/')[0] === 'folder'
                ? window.location.pathname.slice(1).split('/')[1]
                : 'null',
    },
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
            localStorage.setItem('hierarchy', JSON.stringify(state.hierarchy));
        },
        setUploaded: (state, action) => {
            state.uploaded = action.payload;
        },
        setUploadedDone: (state, action) => {
            const index = state.uploaded.findIndex((file: any) => file.name === action.payload.name);
            state.uploaded[index].status = 'done';
        },
        setUploadedFailed: (state, action) => {
            const index = state.uploaded.findIndex((file: any) => file.name === action.payload.name);
            state.uploaded[index].status = 'failed';
        },
        setPermission: (state, action) => {
            state.selectedPermission = action.payload;
        },
        setParentFolderId: (state, action) => {
            state.parentFolderId = action.payload;
        },
    },
});

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
