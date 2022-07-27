import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import CopyPopup from '../../popups/navigationPopup';

type props = {
    handleClick: () => void;
    fsObjectIds: string[];
};

export const Copy: React.FC<props> = ({ handleClick, fsObjectIds }) => {
    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText>{`${i18next.t('contextMenu.Copy')}`}</ListItemText>
            </MenuItem>
            <CopyPopup fsObjectIds={fsObjectIds}></CopyPopup>
        </>
    );
};
