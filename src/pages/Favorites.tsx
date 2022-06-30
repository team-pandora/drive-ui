import { Box } from '@mui/material';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import TableMenuHeader from '../components/BreadCrumbs';
import Grid from '../components/fileView/grids';
import Table from '../components/fileView/tables/Favorites';
import SimpleSnackbar from '../components/snackbars/simple';
import StatusSnackbar from '../components/snackbars/status';
import { FavoritesData } from '../data/fakedata';

const Favorites = () => {
    const isGridView = useSelector((state: any) => state.global.isGridView);

    return (
        <>
            <Box flex={4} paddingTop={2} padding={2}>
                <TableMenuHeader title={i18next.t('titles.Favorites')} />
                {isGridView ? <Grid filesArray={FavoritesData} /> : <Table filesArray={FavoritesData} />}
            </Box>
            <SimpleSnackbar />
            <StatusSnackbar />
        </>
    );
};

export default Favorites;
