import { Box, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/layout/sideNav/Sidebar';
import Topbar from './components/layout/Topbar';
import { Router } from './router';

function App() {
    useTranslation();
    const dir = i18next.dir(i18next.language);

    const handleContextMenu = (e: any) => {
        if (!(e.target instanceof HTMLInputElement && e.target.type === 'text')) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
    }, []);

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
