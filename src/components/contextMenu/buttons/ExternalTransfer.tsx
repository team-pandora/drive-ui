import ShortcutIcon from '@mui/icons-material/Shortcut';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

const ExternalTransfer: React.FC<{ handleClose: () => void }> = (props) => {
    return (
        <MenuItem onClick={props.handleClose}>
            <ListItemIcon>
                <ShortcutIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.ExternalTransfer')}`}</ListItemText>
        </MenuItem>
    );
};

export default ExternalTransfer;
