/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Box, CircularProgress, Snackbar, Stack, styled } from '@mui/material';
import i18next from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFiles } from '../api/files';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids/index';
import NoFiles from '../components/fileView/NoFiles';
import Table from '../components/fileView/tables/MyDrive';
import { MyDriveIcon, NoFilesBox } from '../components/fileView/tables/NoFilesElements';
import { handleUploadFiles } from '../functions/apiHandlers';
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
    const params: { folderId: string } = useParams();
    const parentFolderId: string = params.folderId ? params.folderId : 'null';
    const [locationKeys, setLocationKeys] = useState<any[]>([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);
    const files = useSelector((state: any) => state.files.files);

    const isLoading = useFiles('my-drive', parentFolderId, getFiles);

    if (parentFolderId === 'null') {
        dispatch(filesActions.setHierarchy({ type: 'clear' }));
    }

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
                display: 'flex',
                width: '90%',
                color: 'grey.500',
                alignItems: 'center',
                mt: 2.5,
            }}
            spacing={2}
        >
            <CircularProgress />
        </Stack>
    );

    const onDrop = useCallback(async (acceptedFiles: any) => {
        handleUploadFiles(parentFolderId, dispatch, acceptedFiles, history);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    if (!isLoading && !files.length) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: 800,
                }}
                onDragStart={(event) => event.preventDefault()}
            >
                <NoFilesBox>
                    <NoFiles
                        message={i18next.t('noFilesMessages.myDrive.message')}
                        subMessage={i18next.t('noFilesMessages.myDrive.subMessage')}
                    >
                        <MyDriveIcon />
                    </NoFiles>
                </NoFilesBox>
            </Box>
        );
    }

    return (
        <Box
            sx={{ userSelect: 'none', outline: 'none', border: 'none' }}
            onDragStart={(event) => event.preventDefault()}
            flex={4}
            p={2}
            style={{}}
            {...getRootProps()} // causes browser to crash on enter/space when focused on my drive
        >
            <input {...getInputProps()} />
            <TableMenuHeader title={i18next.t('titles.MyDrive')} />
            {isLoading ? (
                loadingAnimation
            ) : isGridView ? (
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
        </Box>
    );
};

export default MyDrive;
