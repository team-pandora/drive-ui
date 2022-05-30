import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui';
import filesReducer from './files';
import popupsReducer from './popups';
import usersReducer from './users';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        files: filesReducer,
        popups: popupsReducer,
        users: usersReducer,
    },
});

export default store;