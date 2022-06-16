import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global';
import filesReducer from './files';
import popupsReducer from './popups';
import usersReducer from './users';

const store = configureStore({
    reducer: {
        global: globalReducer,
        files: filesReducer,
        popups: popupsReducer,
        users: usersReducer,
    },
});

export default store;
