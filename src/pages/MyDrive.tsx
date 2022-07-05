import { Box, LinearProgress, Stack, styled } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/MyDrive';
import StatusSnackbar from '../components/snackbars/status';
import { useFiles } from '../hooks/useFiles';
import { filesActions } from '../store/files';

// TODO:
const SBox = styled(Box)({
    flex: '4px',
    paddingTop: '2px',
    padding: '2px',
});

const MyDrive = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const params: { folderId: string } = useParams();
    const folderId: string | null = params.folderId ? params.folderId : null;
    const [files, setFiles] = useState<any[]>([]);
    const [locationKeys, setLocationKeys] = useState<any[]>([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);

    const isLoading = useFiles(folderId, setFiles);

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

    const stack = isLoading && (
        <Stack
            sx={{
                width: '85%',
                color: 'grey.500',
                position: 'absolute',
            }}
            spacing={2}
        >
            <LinearProgress color="inherit" />
        </Stack>
    );

    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                {/* TODO: */}
                <TableMenuHeader title={i18next.t('titles.MyDrive')} />
                {isGridView ? <Grid filesArray={files} /> : <Table filesArray={files} />}
                <ToastContainer position="bottom-right" />
                {stack}
            </Box>
            <StatusSnackbar />
        </>
    );
};

export default MyDrive;
