import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import RenamePopup from '../../popups/renamePopup/RenameDialog';

const Rename: React.FC<{ handleClose: () => void }> = (props) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(popupActions.setRename());
        props.handleClose();
    };

    return (
        <Fragment>
            <MenuItem onClick={handleOpen} disabled={false}>
                <ListItemIcon>
                    <BorderColorOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Rename')}`}</ListItemText>
            </MenuItem>
            <RenamePopup />
        </Fragment>
    );
};

export default Rename;
