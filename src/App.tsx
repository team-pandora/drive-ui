import { Box, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from './api/files';
import { getCurrentUser } from './api/users';
import Sidebar from './components/layout/sideNav';
import Topbar from './components/layout/Topbar';
import DriveAnimatedLogo from './DriveAnimationLogo.jsx';
import { Router } from './router';
import { filesActions } from './store/files';
import { usersActions } from './store/users';

function App() {
    useTranslation();
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.users.user);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const handleContextMenu = (e: any) => {
        if (!(e.target instanceof HTMLInputElement && e.target.type === 'text')) {
            e.preventDefault();
        }
    };

    const { isLoading: isLoadingFiles } = useQuery('getFiles', () => getFiles('null'), {
        onError: (error) => {
            console.log('error:', error);
        },
        onSuccess: (data) => {
            dispatch(filesActions.setFiles(data));
        },
    });

    useEffect(() => {
        const initUser = async () => {
            getCurrentUser().then((res) => {
                dispatch(usersActions.setUser(res.data));
                setIsLoadingUser(false);
            });
        };

        initUser();
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
    }, []);

    if (isLoadingUser || isLoadingFiles) {
        return (
            // TODO: center icon
            <div style={{ display: 'flex', justifyContent: 'center', width: '1500px', height: '500px' }}>
                <DriveAnimatedLogo />
            </div>
        );
    }

    return (
        <Box dir={dir}>
            <Topbar />
            <Stack direction="row">
                <Sidebar />
                <Router />
            </Stack>
        </Box>
    );
}

export default App;
