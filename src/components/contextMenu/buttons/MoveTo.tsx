import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import MovePopup from '../../popups/navigationPopup/NavigationDialog';

const MoveTo: React.FC<{ handleClose: () => void }> = (props) => {
    const dispatch = useDispatch();

    const handleShortcutDialog = () => {
        props.handleClose();
        dispatch(popupActions.setNavigation());
    };

    return (
        <>
            <MenuItem onClick={handleShortcutDialog}>
                <ListItemIcon>
                    <DriveFileMoveOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.MoveTo')}`}</ListItemText>
            </MenuItem>
            <MovePopup></MovePopup>
        </>
    );
};

export default MoveTo;
