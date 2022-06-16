import { DriveFileRenameOutline } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import i18next from 'i18next';

const RenameHeader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                margin: '0 15px',
            }}
        >
            <Avatar sx={{ backgroundColor: '#4285f4', width: '32px', height: '32px' }}>
                <DriveFileRenameOutline />
            </Avatar>
            <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                {`${i18next.t('messages.RenamePopupTitle')}`}
            </Typography>
        </Box>
    );
};

export default RenameHeader;
