import { Box } from '@mui/material';
import i18next from 'i18next';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/fileView/tables/StatusTransferred';
import { StatusTransferredData } from '../data/fakedata';

const StatusTransferred = () => {
    return (
        <Box flex={4} paddingTop={2} padding={2}>
            <TableMenuHeader hierarchy={[i18next.t('titles.StatusFilesSent')]} />
            <Table filesArray={StatusTransferredData} />
        </Box>
    );
};

export default StatusTransferred;
