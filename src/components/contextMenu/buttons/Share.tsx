import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import SharePopup from '../../popups/sharePopup/ShareDialog';

const Share: React.FC<{ handleClose: () => void }> = (props) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(popupActions.setShare());
        props.handleClose();
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
