import CloseIcon from '@mui/icons-material/Close';
import { Box, styled, Typography } from '@mui/material';
import i18next from 'i18next';
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
    const dir = i18next.dir(i18next.language);
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
                dir,
            }}
        >
            <HeaderContent sx={{ dir }}>
                <Typography
                    sx={{
                        fontSize: '16px',
                        color: '#777',
                        width: '250px',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        userSelect: 'none',
                        dir,
                    }}
                >
                    Drive
                </Typography>
                <CloseIcon onClick={handleNavigationClose} sx={{ cursor: 'pointer', color: 'gray', dir }} />
            </HeaderContent>
        </Box>
    );
};
