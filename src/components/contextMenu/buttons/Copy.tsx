import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import CopyPopup from '../../popups/navigationPopup';

type props = {
    handleClose: () => void;
};

export const Copy: React.FC<props> = ({ handleClose }) => {
    const dispatch = useDispatch();

    const handleCopyDialog = () => {
        handleClose();
        dispatch(popupActions.setNavigation());
    };

    return (
        <>
            <MenuItem onClick={handleCopyDialog}>
                <ListItemIcon>
                    <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Copy')}`}</ListItemText>
            </MenuItem>
            <CopyPopup></CopyPopup>
        </>
    );
};
