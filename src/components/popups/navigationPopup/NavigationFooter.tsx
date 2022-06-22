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

type props = {
    isRoot: boolean;
    action: string;
};

const NavigationFooter: React.FC<props> = ({ isRoot, action }) => {
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
                {!isRoot && <NewFolderButton onClick={handleNewFolderClick} />}
                <FooterButton onClick={handleNavigationClose}>{action}</FooterButton>
            </FooterContent>
        </Box>
    );
};

NavigationFooter.defaultProps = {
    action: 'Add shortcut',
    isRoot: false,
};

export default NavigationFooter;
