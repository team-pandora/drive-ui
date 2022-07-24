import { Box, Typography } from '@mui/material';

type props = {
    label: string;
};

const GridHeader: React.FC<props> = ({ label }) => {
    return (
        <Box sx={{ width: '100%', height: '40px' }}>
            <Typography color={'gray'} variant="body1">
                {'label'}
            </Typography>
        </Box>
    );
};

export default GridHeader;
