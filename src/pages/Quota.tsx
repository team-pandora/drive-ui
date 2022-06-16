import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/tables/Favorites';
import { FavoritesData } from '../data/fakedata';

const Quota = () => {
    return (
        <Box flex={4} paddingTop={2} padding={2}>
            <TableMenuHeader hierarchy={[i18next.t('titles.Storage')]} />
            <Table filesArray={FavoritesData} />
        </Box>
    );
};

export default Quota;
