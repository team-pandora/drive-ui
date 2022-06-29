import { Box } from '@mui/material';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/Recent';
import StatusSnackbar from '../components/snackbars/status';
import { RecentData } from '../data/fakedata';

const Recently = () => {
    const isGridView = useSelector((state: any) => state.global.isGridView);

    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.Recent')} />
                {isGridView ? <Grid filesArray={RecentData} /> : <Table filesArray={RecentData} />}
            </Box>
            <StatusSnackbar />
        </>
    );
};

export default Recently;
