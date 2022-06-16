import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Box, Button, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';

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

const NavigationFooter = (props: any) => {
    const dispatch = useDispatch();

    const handleNavigationClose = () => {
        dispatch(popupActions.setNavigation());
    };

    const handleNewFolderClick = () => {
        handleNavigationClose();
        dispatch(popupActions.setNewFolder());
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '60px',
                padding: '0 10px',
            }}
        >
            <FooterContent>
                {!props.isRoot && <NewFolderButton onClick={handleNewFolderClick} />}
                <FooterButton onClick={handleNavigationClose}>{props.action}</FooterButton>
            </FooterContent>
        </Box>
    );
};

NavigationFooter.defaultProps = {
    action: 'Add shortcut',
    isRoot: false,
};

export default NavigationFooter;
