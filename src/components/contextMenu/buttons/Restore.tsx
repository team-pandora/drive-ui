import RestoreIcon from '@mui/icons-material/Restore';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = { handleClick: () => void };

const Restore: React.FC<props> = ({ handleClick }) => {
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <RestoreIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Restore')}`}</ListItemText>
        </MenuItem>
    );
};

export default Restore;
