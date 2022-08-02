import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import ShareByLink from './ShareByLink';
import ShareUsers from './ShareUsers';

const SharePopup = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Grid>
            <Grid item>
                <ShareUsers isOpen={isOpen} handleChange={handleChange} />
            </Grid>
            <Box
                style={{
                    padding: '5px',
                }}
            ></Box>
            <Grid item>
                <ShareByLink isOpen={isOpen} handleChange={handleChange} />
            </Grid>
        </Grid>
    );
};

export default SharePopup;
