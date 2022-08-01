import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import i18next from 'i18next';
import RenamePopup from '../../popups/renamePopup';

type props = { handleClick: () => void };

const Rename: React.FC<props> = ({ handleClick }) => {
    return (
        <>
            <MenuItem onClick={handleClick} disabled={false}>
                <ListItemIcon>
                    <BorderColorOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Rename')}`}</ListItemText>
                <Typography sx={{ color: '#757575', fontWeight: '300', fontSize: '14px' }}>F2</Typography>
            </MenuItem>
            <RenamePopup />
        </>
    );
};

export default Rename;
