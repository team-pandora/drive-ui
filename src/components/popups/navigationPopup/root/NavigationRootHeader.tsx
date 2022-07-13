import CloseIcon from '@mui/icons-material/Close';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../../store/popups';

const HeaderContent = styled(Box)({
    margin: '14px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
});

export const NavigationRootHeader = () => {
    const dispatch = useDispatch();

    const handleNavigationClose = () => {
        dispatch(popupActions.setNavigation());
    };

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: '#f1f1f1',
                height: '60px',
            }}
        >
            <HeaderContent>
                <Typography
                    sx={{
                        fontSize: '16px',
                        color: '#777',
                        width: '250px',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        userSelect: 'none',
                    }}
                >
                    Drive
                </Typography>
                <CloseIcon onClick={handleNavigationClose} sx={{ cursor: 'pointer', color: 'gray' }} />
            </HeaderContent>
        </Box>
    );
};
