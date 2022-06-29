import { Box } from '@mui/material';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/Shared';
import SimpleSnackbar from '../components/snackbars/simple';
import StatusSnackbar from '../components/snackbars/status';
import { SharedData } from '../data/fakedata';

const Shared = () => {
    const isGridView = useSelector((state: any) => state.global.isGridView);

    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.SharedWithMe')} />
                {isGridView === true ? <Grid filesArray={SharedData} /> : <Table filesArray={SharedData} />}
            </Box>
            <SimpleSnackbar />
            <StatusSnackbar />
        </>
    );
};

export default Shared;
