/* eslint-disable no-nested-ternary */
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
import SimpleSnackbar from '../components/snackbars/simple';
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
    const folderId: string | null = params.folderId ? params.folderId : 'null';
    const [locationKeys, setLocationKeys] = useState<any[]>([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);
    const files = useSelector((state: any) => state.files.files);
    console.log('files', files);

    const isLoading = useFiles(folderId);

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
        <Stack
            sx={{
                width: '85%',
                color: 'grey.500',
                position: 'absolute',
                mt: 1.2,
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
                {isLoading ? loadingAnimation : isGridView ? <Grid filesArray={files} /> : <Table filesArray={files} />}
                <ToastContainer position="bottom-right" />
            </Box>
            <SimpleSnackbar />
            <StatusSnackbar />
        </>
    );
};

export default MyDrive;
