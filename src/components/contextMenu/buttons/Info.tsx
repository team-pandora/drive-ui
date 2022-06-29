import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import InfoPopup from '../../popups/infoPopup';

type props = {
    handleClose: () => void;
};

const Info: React.FC<props> = ({ handleClose }) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(popupActions.setInfo());
        handleClose();
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
