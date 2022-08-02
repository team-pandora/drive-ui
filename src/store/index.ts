import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './files';
import globalReducer from './global';
import popupsReducer from './popups';
import usersReducer from './users';
import notificationsReducer from './notifications';
import permissionReducer from './permissions';

const store = configureStore({
    reducer: {
        global: globalReducer,
        files: filesReducer,
        popups: popupsReducer,
        users: usersReducer,
        notifications: notificationsReducer,
        permissions: permissionReducer,
    },
});

export default store;
