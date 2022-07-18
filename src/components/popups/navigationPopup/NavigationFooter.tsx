import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Box, Button, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { copy, createShortcut, getFile, move } from '../../../api/files';
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
    parent: string | null;
    fetchFunc: any;
    fsObjectId: string;
};

const NavigationFooter: React.FC<props> = ({ parent, fetchFunc, fsObjectId }) => {
    const dispatch = useDispatch();
    const displayNewFolder = parent === undefined || parent === 'shared';

    const action = useSelector((state: any) => state.popups.navigationState);
    const folderId = useSelector((state: any) => state.popups.navigationSelectedFolder);

    const handleClick = async () => {
        const file = await getFile(fsObjectId);
        if (action === 'shortcut')
            createShortcut(fsObjectId, `Shortcut to ${file.name}`, folderId === null ? parent : folderId);
        else if (action === 'move') move(fsObjectId, folderId === null ? parent : folderId, file.type);
        else if (action === 'copy') copy(fsObjectId, `Copy of ${file.name}`, folderId === null ? parent : folderId);

        dispatch(popupActions.setNavigation());
    };

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
                    {!displayNewFolder && <NewFolderButton onClick={handleNewFolderClick} />}
                    <FooterButton onClick={handleClick}>
                        <span style={{ textTransform: 'capitalize' }}>{action}</span>
                    </FooterButton>
                </FooterContent>
            </Box>
            <NavigationNewFolderPopup parent={parent} fetchFunc={fetchFunc}></NavigationNewFolderPopup>
        </>
    );
};

export default NavigationFooter;
