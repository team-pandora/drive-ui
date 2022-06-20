import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import RemovePopup from '../../popups/removePopup';

type props = { handleClick: () => void };

const Remove: React.FC<props> = ({ handleClick }) => {
    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <DeleteOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Remove')}`}</ListItemText>
            </MenuItem>
            <RemovePopup />
        </>
    );
};

export default Remove;
