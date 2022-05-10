import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui';
import filesReducer from './files';
import popupsReducer from './popups';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        files: filesReducer,
        popups: popupsReducer
    },
});

export default store;