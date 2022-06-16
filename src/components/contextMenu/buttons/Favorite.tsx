import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

const Favorite: React.FC<{ handleClose: () => void }> = (props) => {
    return (
        <MenuItem onClick={props.handleClose}>
            <ListItemIcon>
                <StarBorderIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Favorite')}`}</ListItemText>
        </MenuItem>
    );
};

export default Favorite;
