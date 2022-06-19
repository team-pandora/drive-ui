import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = {
    handleClose: () => void;
};

const Copy: React.FC<props> = ({ handleClose }) => {
    return (
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <ContentCopyIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Copy')}`}</ListItemText>
        </MenuItem>
    );
};

export default Copy;
