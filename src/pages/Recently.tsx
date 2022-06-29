import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/fileView/tables/Recent';
import StatusSnackbar from '../components/snackbars/status';
import { RecentData } from '../data/fakedata';

const Recently = () => {
    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.Recent')} />
                <Table filesArray={RecentData} />
            </Box>
            <StatusSnackbar />
        </>
    );
};

export default Recently;
