import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

const Remove: React.FC<{ handleClose: () => void }> = (props) => {
    return (
        <MenuItem onClick={props.handleClose}>
            <ListItemIcon>
                <DeleteOutlinedIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Remove')}`}</ListItemText>
        </MenuItem>
    );
};

export default Remove;
