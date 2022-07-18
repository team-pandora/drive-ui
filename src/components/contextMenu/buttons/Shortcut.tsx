import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import ShortcutPopup from '../../popups/navigationPopup';

type props = {
    handleClick: () => void;
    fsObjectId: string;
};

const Shortcut: React.FC<props> = ({ handleClick, fsObjectId }) => {
    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <AddToDriveIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Shortcut')}`}</ListItemText>
            </MenuItem>
            <ShortcutPopup fsObjectId={fsObjectId} />
        </>
    );
};

export default Shortcut;
