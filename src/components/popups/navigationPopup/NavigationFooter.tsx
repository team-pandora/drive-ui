import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Box, Button, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFile } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import NavigationNewFolderPopup from './navigationNewFolder';

const FooterContent = styled(Box)({
    margin: '14px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
});

const FooterButton = styled(Button)({
    marginLeft: 'auto',
    width: 'fit-content',
    backgroundColor: '#1a73e8',
    color: 'white',
    borderRadius: '2px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#1a73e8',
    },
});

const NewFolderButton = styled(CreateNewFolderIcon)({
    color: 'gray',
    cursor: 'pointer',
});

type props = {
    parent: string | undefined | null;
    action: string;
    fetchFunc: any;
};

const NavigationFooter: React.FC<props> = ({ parent, action, fetchFunc }) => {
    const dispatch = useDispatch();
    const isRoot = parent === undefined;

    const handleNavigationClose = () => {
        dispatch(popupActions.setNavigation());
    };

    const handleNewFolderClick = () => {
        dispatch(popupActions.setNavigationNewFolder());
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    height: '60px',
                    padding: '0 10px',
                }}
            >
                <FooterContent>
                    {!isRoot && <NewFolderButton onClick={handleNewFolderClick} />}
                    <FooterButton onClick={handleNavigationClose}>{action}</FooterButton>
                </FooterContent>
            </Box>
            <NavigationNewFolderPopup parent={parent} fetchFunc={fetchFunc}></NavigationNewFolderPopup>
        </>
    );
};

export default NavigationFooter;
