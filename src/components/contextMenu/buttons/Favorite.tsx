import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = {
    handleClose: () => void;
};

const Favorite: React.FC<props> = ({ handleClose }) => {
    return (
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <StarBorderIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Favorite')}`}</ListItemText>
        </MenuItem>
    );
};

export default Favorite;
