import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import MovePopup from '../../popups/navigationPopup';

type props = {
    handleClick: () => void;
    fsObjectIds: string[];
};

const MoveTo: React.FC<props> = ({ handleClick, fsObjectIds }) => {
    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <DriveFileMoveOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.MoveTo')}`}</ListItemText>
            </MenuItem>
            <MovePopup fsObjectIds={fsObjectIds}></MovePopup>
        </>
    );
};

export default MoveTo;
