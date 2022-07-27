import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import ShortcutPopup from '../../popups/navigationPopup';

type props = {
    handleClick: () => void;
    fsObjectIds: string[];
};

const Shortcut: React.FC<props> = ({ handleClick, fsObjectIds }) => {
    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <AddToDriveIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Shortcut')}`}</ListItemText>
            </MenuItem>
            <ShortcutPopup fsObjectIds={fsObjectIds} />
        </>
    );
};

export default Shortcut;
