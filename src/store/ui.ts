import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { mainMenuIsVisible: false, anchorEl: null, language: 'en', contextMenu: false, contextMenuPosition: {x: 0, y: 0} || null },
    reducers: {
        toggleMainMenu: (state) => {
            state.mainMenuIsVisible = !state.mainMenuIsVisible;
        },
        setAnchorEl: (state, action) => {
            state.anchorEl = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setContextMenu: (state) => {
            state.contextMenu = !state.contextMenu;
        },
        setContextMenuPosition: (state, action) => {
            state.contextMenuPosition = action.payload;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;