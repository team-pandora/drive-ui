import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import MovePopup from '../../popups/navigationPopup';

type props = {
    handleClick: () => void;
    fsObjectIds: string[];
    disabled?: boolean;
};

const MoveTo: React.FC<props> = ({ handleClick, fsObjectIds, disabled }) => {
    return (
        <>
            <MenuItem disabled={disabled} onClick={handleClick}>
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
