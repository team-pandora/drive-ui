import DownloadIcon from '@mui/icons-material/Download';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = {
    handleClick: () => void;
};

const Download: React.FC<props> = ({ handleClick }) => {
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <DownloadIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Download')}`}</ListItemText>
        </MenuItem>
    );
};

export default Download;
