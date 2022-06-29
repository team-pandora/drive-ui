import { Box } from '@mui/material';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/Trash';
import StatusSnackbar from '../components/snackbars/status';
import { TrashData } from '../data/fakedata';

const Trash = () => {
    const isGridView = useSelector((state: any) => state.global.isGridView);

    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.Trash')} />
                {isGridView ? <Grid filesArray={TrashData} /> : <Table filesArray={TrashData} />}
            </Box>
            <StatusSnackbar />
        </>
    );
};

export default Trash;
