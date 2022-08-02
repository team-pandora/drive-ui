/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const permissionSlice = createSlice({
    name: 'permissions',
    initialState: {
        filePermissionsData: {
            fileId: '',
            owner: {},
            currentUserPermission: {},
            permittedUsers: [],
        },
        selectedPermission: '',
    },
    reducers: {
        setFilePermissionsData: (state, action) => {
            state.filePermissionsData = action.payload;
        },
        setPermission: (state, action) => {
            state.selectedPermission = action.payload;
        },
    },
});

export const permissionActions = permissionSlice.actions;

export default permissionSlice.reducer;
