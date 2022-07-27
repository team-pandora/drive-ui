import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToFavorite, removeFromFavorite } from '../../../api/files';
import { filesActions } from '../../../store/files';
import { globalActions } from '../../../store/global';
import { notificationsActions } from '../../../store/notifications';
import { selectGetFilesFunc } from '../../../utils/files';

type props = {
    action: 'Favorite' | 'Unfavorite';
    disabled?: boolean;
};

const Favorite: React.FC<props> = ({ action, disabled }) => {
    const dispatch = useDispatch();
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const messages = {
        Favorite: {
            successOne: i18next.t('messages.FileAddedToFavorites'),
            successMany: i18next.t('messages.FilesAddedToFavorites'),
            error: i18next.t('messages.FailedAddingToFavorites'),
        },
        Unfavorite: {
            successOne: i18next.t('messages.FileRemovedFromFavorites'),
            successMany: i18next.t('messages.FilesRemovedFromFavorites'),
            error: i18next.t('messages.FailedRemovingFromFavorites'),
        },
    };

    const handleClick = async () => {
        try {
            await Promise.all(selectedFiles.map(action === 'Favorite' ? addToFavorite : removeFromFavorite));

            dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
            const message = selectedFiles.length === 1 ? messages[action].successOne : messages[action].successMany;
            dispatch(notificationsActions.setSimpleOpen(message));
        } catch (error) {
            toast.error(messages[action].error);
        } finally {
            dispatch(globalActions.setContextMenu());
        }
    };

    return (
        <MenuItem onClick={handleClick} disabled={disabled}>
            <ListItemIcon>{action === 'Favorite' || disabled ? <StarBorderIcon /> : <StarIcon />}</ListItemIcon>
            <ListItemText>
                {action === 'Favorite' || disabled
                    ? `${i18next.t('contextMenu.Favorite')}`
                    : `${i18next.t('contextMenu.Unfavorite')}`}
            </ListItemText>
        </MenuItem>
    );
};

export default Favorite;
