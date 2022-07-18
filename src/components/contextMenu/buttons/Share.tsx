import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import SharePopup from '../../popups/sharePopup';

type props = { handleClick: () => void };

const Share: React.FC<props> = ({ handleClick }) => {
    return (
        <Fragment>
            <MenuItem onClick={handleClick} disabled={false}>
                <ListItemIcon>
                    <PersonAddAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Share')}`}</ListItemText>
            </MenuItem>
            <SharePopup />
        </Fragment>
    );
};

export default Share;
