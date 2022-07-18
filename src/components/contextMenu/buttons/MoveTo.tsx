import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import MovePopup from '../../popups/navigationPopup';

type props = {
    handleClick: () => void;
    fsObjectId: string;
};

const MoveTo: React.FC<props> = ({ handleClick, fsObjectId }) => {
    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <DriveFileMoveOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.MoveTo')}`}</ListItemText>
            </MenuItem>
            <MovePopup fsObjectId={fsObjectId}></MovePopup>
        </>
    );
};

export default MoveTo;
