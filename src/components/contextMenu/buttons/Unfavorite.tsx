import StarIcon from '@mui/icons-material/Star';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = {
    handleClose: () => void;
};

const Unfavorite: React.FC<props> = ({ handleClose }) => {
    return (
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <StarIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Unfavorite')}`}</ListItemText>
        </MenuItem>
    );
};

export default Unfavorite;
