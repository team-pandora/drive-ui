import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import ShortcutPopup from '../../popups/navigationPopup';

const Shortcut: React.FC<{ handleClose: () => void }> = (props) => {
    const dispatch = useDispatch();

    const handleShortcutDialog = () => {
        props.handleClose();
        dispatch(popupActions.setNavigation());
    };

    return (
        <>
            <MenuItem onClick={handleShortcutDialog}>
                <ListItemIcon>
                    <AddToDriveIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Shortcut')}`}</ListItemText>
            </MenuItem>
            <ShortcutPopup />
        </>
    );
};

export default Shortcut;
