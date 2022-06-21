/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        mainMenuIsVisible: false,
        anchorEl: null,
        contextMenu: false,
        contextMenuPosition: { x: 0, y: 0 } || null,
    },
    reducers: {
        toggleMainMenu: (state) => {
            state.mainMenuIsVisible = !state.mainMenuIsVisible;
        },
        setAnchorEl: (state, action) => {
            state.anchorEl = action.payload;
        },
        setContextMenu: (state) => {
            state.contextMenu = !state.contextMenu;
        },
        setContextMenuPosition: (state, action) => {
            state.contextMenuPosition = action.payload;
        },
        // TODO: add to cookies
    },
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
