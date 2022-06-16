import { Box, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from './components/layout/sideNav/Sidebar';
import Topbar from './components/layout/Topbar';
import Favorites from './pages/Favorites';
import IncomingCargo from './pages/IncomingCargo';
import IncomingTomcal from './pages/IncomingTomcal';
import MyDrive from './pages/MyDrive';
import Quota from './pages/Quota';
import Recently from './pages/Recently';
import Shared from './pages/Shared';
import StatusTransferred from './pages/StatusTransferred';
import Trash from './pages/Trash';

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
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/my-drive" />
                    </Route>
                    <Route path="/my-drive" exact>
                        <MyDrive />
                    </Route>
                    <Route path="/folder/:folderId" exact>
                        <MyDrive />
                    </Route>
                    <Route path="/shared" exact>
                        <Shared />
                    </Route>
                    <Route path="/recently" exact>
                        <Recently />
                    </Route>
                    <Route path="/favorites" exact>
                        <Favorites />
                    </Route>
                    <Route path="/trash" exact>
                        <Trash />
                    </Route>
                    <Route path="/storage" exact>
                        <Quota />
                    </Route>
                    {/* TODO: */}
                    <Route path="/external-transferred-dropbox">
                        <IncomingTomcal />
                    </Route>
                    <Route path="/external-transferred-cargo">
                        <IncomingCargo />
                    </Route>
                    <Route path="/statusTransferred">
                        <StatusTransferred />
                    </Route>
                </Switch>
            </Stack>
        </Box>
    );
}

export default App;
