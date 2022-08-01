import { Box, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { handleErrorMsg } from './api/error';
import { getFiles } from './api/files';
import { getCurrentUser } from './api/users';
import Sidebar from './components/layout/sideNav';
import Topbar from './components/layout/Topbar';
import SimpleSnackbar from './components/snackbars/simple';
import StatusSnackbar from './components/snackbars/status';
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

    const { isLoading: isLoadingFiles } = useQuery(['my-drive', 'null'], () => getFiles('null'), {
        onError: handleErrorMsg('Failed loading files', window.location.pathname.slice(1)),
        onSuccess: (data) => {
            dispatch(filesActions.setFiles(data));
        },
        retry: false,
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
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    width: '50vw',
                    marginLeft: '25%',
                    justifyContent: 'center',
                }}
            >
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
                <SimpleSnackbar />
                <StatusSnackbar />
            </Stack>
        </Box>
    );
}

export default App;
