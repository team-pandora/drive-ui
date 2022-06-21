import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../../../store/popups';
import InfoPopup from '../../popups/infoPopup';

const Info: React.FC<{ handleClose: () => void }> = (props) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(popupActions.setInfo());
        props.handleClose();
    };

    return (
        <>
            <MenuItem onClick={handleOpen} disabled={false}>
                <ListItemIcon>
                    <InfoOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Info')}`}</ListItemText>
            </MenuItem>
            <InfoPopup />
        </>
    );
};

export default Info;
