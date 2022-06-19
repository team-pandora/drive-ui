import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/fileView/tables/IncomingTomcal';
import { FavoritesData } from '../data/fakedata';

const IncomingTomcal = () => {
    return (
        <Box flex={4} paddingTop={2} padding={2}>
            <TableMenuHeader hierarchy={[i18next.t('titles.IncomingFromTomcal')]} />
            <Table filesArray={FavoritesData} />
        </Box>
    );
};

export default IncomingTomcal;
