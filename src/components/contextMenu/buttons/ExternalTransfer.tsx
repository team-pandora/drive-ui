import ShortcutIcon from '@mui/icons-material/Shortcut';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = {
    handleClose: () => void;
};

const ExternalTransfer: React.FC<props> = ({ handleClose }) => {
    return (
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <ShortcutIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.ExternalTransfer')}`}</ListItemText>
        </MenuItem>
    );
};

export default ExternalTransfer;
