import NotesIcon from '@mui/icons-material/Notes';
import { Avatar, Box, Typography } from '@mui/material';
import i18next from 'i18next';

const StorageHeader = () => {
    const dir = i18next.dir(i18next.language);

    return (
        <Box
            dir={dir}
            sx={{
                display: 'flex',
                margin: '10px 0',
            }}
        >
            <Avatar sx={{ backgroundColor: '#4285f4', width: '32px', height: '32px' }}>
                <NotesIcon />
            </Avatar>
            <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                {`${i18next.t('messages.RequestStorage')}`}
            </Typography>
        </Box>
    );
};

export default StorageHeader;
