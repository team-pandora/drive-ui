import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/tables/IncomingTomcal';
import { FavoritesData } from '../data/fakedata';

const IncomingCargo = () => {
    return (
        <Box flex={4} paddingTop={2} padding={2}>
            <TableMenuHeader hierarchy={[i18next.t('titles.IncomingFromCargo')]} />
            <Table filesArray={FavoritesData} />
        </Box>
    );
};

export default IncomingCargo;
