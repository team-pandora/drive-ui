/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Box, Snackbar, styled } from '@mui/material';
import i18next from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFiles, handleDropFile } from '../api/files';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids/index';
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
    document.title = `Drive – ${i18next.t('sideBar.myDrive')}`;
    const history = useHistory();
    const dispatch = useDispatch();
    const [locationKeys, setLocationKeys] = useState<any[]>([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);
    const files = useSelector((state: any) => state.files.files);
    const parentFolderId = useSelector((state: any) => state.files.parentFolderId);

    const isLoading = useFiles('my-drive', parentFolderId, getFiles);

    if (folderId === 'null') {
        dispatch(filesActions.setHierarchy({ type: 'clear' }));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('asdasasdasd');

            event.preventDefault();
        }
    };

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

    const onDrop = useCallback(async (acceptedFiles: any) => {
        handleDropFile(parentFolderId, dispatch, acceptedFiles, history);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });
    return (
        <>
            <Box
                sx={{ userSelect: 'none', outline: 'none', border: 'none' }}
                flex={4}
                p={2}
                style={{}}
                {...getRootProps()} // causes browser to crash on enter/space when focused on my drive
            >
                <input {...getInputProps()} />
                <TableMenuHeader title={i18next.t('titles.MyDrive')} />
                {isGridView ? (
                    <Grid filesArray={files} isLoading={isLoading} />
                ) : (
                    <Table filesArray={files} isLoading={isLoading} />
                )}
                <ToastContainer position="bottom-right" />
                {isDragActive && (
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={true}
                        message={`${i18next.t('messages.DragFilesHere')}`}
                    ></Snackbar>
                )}
                <SimpleSnackbar />
                <StatusSnackbar />
            </Box>
        </>
    );
};

export default MyDrive;
