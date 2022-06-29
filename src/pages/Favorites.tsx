import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/fileView/tables/Favorites';
import StatusSnackbar from '../components/snackbars/status';
import { FavoritesData } from '../data/fakedata';

const Favorites = () => {
    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.Favorites')} />
                <Table filesArray={FavoritesData} />
            </Box>
            <StatusSnackbar />
        </>
    );
};

export default Favorites;
