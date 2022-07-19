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
import { getFiles, uploadFile } from '../api/files';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids/index';
import Table from '../components/fileView/tables/MyDrive';
import SimpleSnackbar from '../components/snackbars/simple';
import StatusSnackbar from '../components/snackbars/status';
import { useFiles } from '../hooks/useFiles';
import { filesActions } from '../store/files';
import { notificationsActions } from '../store/notifications';

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
    const folderId: string = params.folderId ? params.folderId : 'null';
    const [locationKeys, setLocationKeys] = useState<any[]>([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);
    const files = useSelector((state: any) => state.files.files);

    const isLoading = useFiles('my-drive', folderId, getFiles);

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
        const filesWithStatus = acceptedFiles.map((file: any) => {
            return { name: file.name, status: 'uploading' };
        });
        console.log('hello', filesWithStatus);

        dispatch(filesActions.setUploaded(filesWithStatus));
        dispatch(notificationsActions.setUploadOpen());

        for (const file of acceptedFiles) {
            try {
                await uploadFile(file, folderId);
                dispatch(filesActions.setFiles(await getFiles(folderId)));
                dispatch(filesActions.setUploadedDone(file));
            } catch (error) {
                console.log(error);
                dispatch(filesActions.setUploadedFailed(file));
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    return (
        <>
            <Box
                flex={4}
                p={2}
                style={{
                    backgroundColor: 'white',
                    // height: '830px',
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <TableMenuHeader title={i18next.t('titles.MyDrive')} />
                {isGridView ? <Grid filesArray={files} /> : <Table filesArray={files} />}
                <ToastContainer position="bottom-right" />
                {isDragActive && (
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={true}
                        message="קבצים שמשוחררים כאן ייעלו מידיית לכאן"
                    ></Snackbar>
                )}
                <SimpleSnackbar />
                <StatusSnackbar />
            </Box>
        </>
    );
};

export default MyDrive;
