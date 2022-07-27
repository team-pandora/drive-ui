import { Box } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getSharedFiles } from '../api/files';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/Shared';
import SimpleSnackbar from '../components/snackbars/simple';
import StatusSnackbar from '../components/snackbars/status';
import { useFiles } from '../hooks/useFiles';
import { filesActions } from '../store/files';

const Shared = () => {
    document.title = `Drive – ${i18next.t('sideBar.SharedWithMe')}`;
    const history = useHistory();
    const dispatch = useDispatch();
    const params: { folderId: string } = useParams();
    const folderId: string = params.folderId ? params.folderId : 'null';
    const [locationKeys, setLocationKeys] = useState<any[]>([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);
    const files = useSelector((state: any) => state.files.files);

    if (folderId === 'null') {
        dispatch(filesActions.setHierarchy({ type: 'clear' }));
    }

    const isLoading = useFiles('shared', folderId, getSharedFiles);

    useEffect(() => {
        return history.listen((location) => {
            if (history.action === 'PUSH') {
                setLocationKeys([location.key]);
            }

            if (history.action === 'POP') {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([_, ...keys]) => keys);
                    dispatch(filesActions.setHierarchy({ type: 'forward' }));
                } else {
                    setLocationKeys((keys) => [location.key, ...keys]);
                    dispatch(filesActions.setHierarchy({ type: 'pop' }));
                }
            }
        });
    }, [locationKeys]);

    const loadingAnimation = (
        // <Stack
        //     sx={{
        //         width: '85%',
        //         color: 'grey.500',
        //         position: 'absolute',
        //         mt: 1.2,
        //     }}
        //     spacing={2}
        // >
        //     <LinearProgress color="inherit" />
        // </Stack>
        <></>
    );

    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.SharedWithMe')} />
                {isGridView === true ? (
                    <Grid filesArray={files} isLoading={isLoading} />
                ) : (
                    <Table filesArray={files} isLoading={isLoading} />
                )}
                <ToastContainer position="bottom-right" />
            </Box>
            <SimpleSnackbar />
            <StatusSnackbar />
        </>
    );
};

export default Shared;
