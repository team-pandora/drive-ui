import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
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
                <Typography sx={{ color: '#757575', fontWeight: '300', fontSize: '14px' }}>Delete</Typography>
            </MenuItem>
            <RemovePopup />
        </>
    );
};

export default Remove;
