/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
    name: 'popups',
    initialState: {
        share: false,
        link: false,
        rename: false,
        info: false,
        moveTo: false,
        remove: false,
        copy: false,
        shortcut: false,
        externalTransfer: false,
        newFolder: false,
        navigation: false,
        navigationNewFolder: false,
        storage: false,
    },
    reducers: {
        setShare: (state) => {
            state.share = !state.share;
        },
        setLink: (state) => {
            state.link = !state.link;
        },
        setRename: (state) => {
            state.rename = !state.rename;
        },
        setInfo: (state) => {
            state.info = !state.info;
        },
        setMoveTo: (state) => {
            state.moveTo = !state.moveTo;
        },
        setRemove: (state) => {
            state.remove = !state.remove;
        },
        setCopy: (state) => {
            state.copy = !state.copy;
        },
        setShortcut: (state) => {
            state.shortcut = !state.shortcut;
        },
        externalTransfer: (state) => {
            state.externalTransfer = !state.externalTransfer;
        },
        setNewFolder: (state) => {
            state.newFolder = !state.newFolder;
        },
        setNavigation: (state) => {
            state.navigation = !state.navigation;
        },
        setNavigationNewFolder: (state) => {
            state.navigationNewFolder = !state.navigationNewFolder;
        },
        setStorage: (state) => {
            state.storage = !state.storage;
        },
    },
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
