import { Box, LinearProgress, Stack, styled } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFile } from '../api/files';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/grids/MyDrive';
import Table from '../components/tables/MyDrive';
import { IServerError } from '../utils/types';

// TODO:
const SBox = styled(Box)({
    flex: '4px',
    paddingTop: '2px',
    padding: '2px',
});

const MyDrive = () => {
    const params: { folderId: string } = useParams();
    const folderId: string | null = params.folderId ? params.folderId : null;
    const [files, setFiles] = useState([]);
    const isGridView = useSelector((state: any) => state.global.isGridView);

    // TODO:
    const { isLoading } = useQuery('files', () => getFile(folderId), {
        onError: (error: IServerError) => {
            toast.error('Failed loading files');
        },
        onSuccess: (data) => {
            setFiles(data);
        },
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true,
    });

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
        <Box flex={4} paddingTop={2} padding={2}>
            {/* TODO: */}
            <TableMenuHeader hierarchy={[i18next.t('titles.MyDrive')]} />
            {isGridView ? <Grid filesArray={files} /> : <Table filesArray={files} />}
            <ToastContainer position="bottom-right" />
            {stack}
        </Box>
    );
};

export default MyDrive;
