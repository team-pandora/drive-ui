/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        mainMenuIsVisible: false,
        anchorEl: null,
        language: 'en',
        contextMenu: false,
        contextMenuPosition: { x: 0, y: 0 } || null,
        isGridView: false,
    },
    reducers: {
        toggleMainMenu: (state) => {
            state.mainMenuIsVisible = !state.mainMenuIsVisible;
        },
        setAnchorEl: (state, action) => {
            state.anchorEl = action.payload;
        },
        // TODO: check if necessary
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setContextMenu: (state) => {
            state.contextMenu = !state.contextMenu;
        },
        setContextMenuPosition: (state, action) => {
            state.contextMenuPosition = action.payload;
        },
        // TODO: add to cookies
        toggleGridView: (state) => {
            state.isGridView = !state.isGridView;
        },
    },
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
