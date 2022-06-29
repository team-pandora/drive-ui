import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import SharePopup from '../../popups/sharePopup';

type props = { handleClose: () => void };

const Share: React.FC<props> = ({ handleClose }) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(popupActions.setShare());
        handleClose();
    };

    return (
        <Fragment>
            <MenuItem onClick={handleOpen} disabled={false}>
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
