/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCookieValue } from '../utils/cookies';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        mainMenuIsVisible: false,
        anchorEl: null,
        contextMenu: false,
        contextMenuPosition: { x: 0, y: 0 } || null,
        backgroundMenu: false,
        backgroundMenuPosition: { x: 0, y: 0 } || null,
        isGridView: getCookieValue('isGridView') === 'true',
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
        setIsGridView: (state) => {
            state.isGridView = !state.isGridView;
            document.cookie = `isGridView=${state.isGridView}`;
        },
        setBackgroundMenuPosition: (state, action) => {
            state.backgroundMenuPosition = action.payload;
        },
        setBackgroundMenu: (state) => {
            state.backgroundMenu = !state.backgroundMenu;
        },
    },
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
