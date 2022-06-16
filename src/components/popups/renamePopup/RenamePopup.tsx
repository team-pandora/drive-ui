import { Box } from '@mui/material';
import i18next from 'i18next';
import RenameBody from './RenameBody';
import RenameHeader from './RenameHeader';

const RenamePopup = () => {
    const dir = i18next.dir(i18next.language);

    return (
        <Box
            sx={{
                width: '100%',
                height: '200px',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                direction: dir,
                justifyContent: 'space-evenly',
                overflow: 'hidden',
            }}
        >
            <RenameHeader />
            <RenameBody />
        </Box>
    );
};

export default RenamePopup;
