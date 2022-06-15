import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
    name: 'popups',
    initialState: { share: false, link: false, rename: false, info: false, moveTo: false, copy: false, shortcut: false, externalTransfer: false, newFolder:false, navigation:false },
    reducers: {
        setShare: (state) => {
            state.share = !state.share;
        },
        setLink: (state, action) => {
            state.link = !state.link;
        },
        setRename: (state) => {
            state.rename = !state.rename;
        },
        setInfo: (state) => {
            state.info = !state.info;
        },
        setMoveTo: (state, action) => {
            state.moveTo = !state.moveTo;
        },
        setCopy: (state, action) => {
            state.copy = !state.copy;
        },
        setShortcut: (state, action) => {
            state.shortcut = !state.shortcut;
        },
        externalTransfer: (state, action) => {
            state.externalTransfer = !state.externalTransfer;
        },
        setNewFolder: (state) => {
            state.newFolder = !state.newFolder;
        },
        setNavigation: (state) => {
            state.navigation = !state.navigation;
        }
    }
})

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;