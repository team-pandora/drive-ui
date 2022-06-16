import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

const Copy: React.FC<{ handleClose: () => void }> = (props) => {
    return (
        <MenuItem onClick={props.handleClose}>
            <ListItemIcon>
                <ContentCopyIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Copy')}`}</ListItemText>
        </MenuItem>
    );
};

export default Copy;
