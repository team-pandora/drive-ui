import { Box, LinearProgress, Stack, styled } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/MyDrive';
import { useFiles } from '../hooks/useFiles';
import { getCookieValue } from '../utils/cookies';

// TODO:
const SBox = styled(Box)({
    flex: '4px',
    paddingTop: '2px',
    padding: '2px',
});

const MyDrive = () => {
    const params: { folderId: string } = useParams();
    const folderId: string | null = params.folderId ? params.folderId : null;
    const [files, setFiles] = useState<any[]>([]);
    const isGridView = getCookieValue('isGridView') === 'true';

    const isLoading = useFiles(folderId, setFiles);

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
            <TableMenuHeader title={i18next.t('titles.MyDrive')} />
            {isGridView ? <Grid filesArray={files} /> : <Table filesArray={files} />}
            <ToastContainer position="bottom-right" />
            {stack}
        </Box>
    );
};

export default MyDrive;
