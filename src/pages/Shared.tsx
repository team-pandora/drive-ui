import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/fileView/tables/Shared';
import { SharedData } from '../data/fakedata';

const Shared = () => {
    return (
        <Box flex={4} paddingTop={2} padding={2}>
            <TableMenuHeader hierarchy={[i18next.t('titles.SharedWithMe')]} />
            <Table filesArray={SharedData} />
        </Box>
    );
};

export default Shared;
