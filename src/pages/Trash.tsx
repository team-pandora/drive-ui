import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/fileView/tables/Trash';
import StatusSnackbar from '../components/snackbars/status';
import { TrashData } from '../data/fakedata';

const Trash = () => {
    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.Trash')} />
                <Table filesArray={TrashData} />
            </Box>
            <StatusSnackbar />
        </>
    );
};

export default Trash;
