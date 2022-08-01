import { Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTrashFiles, restoreFile } from '../../api/files';
import { filesActions } from '../../store/files';
import { globalActions } from '../../store/global';
import { notificationsActions } from '../../store/notifications';
import { popupActions } from '../../store/popups';
import Remove from './buttons/Remove';
import Restore from './buttons/Restore';

const TrashContextMenu = () => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const contextMenu = useSelector((state: any) => state.global.contextMenu);
    const contextMenuPosition = useSelector((state: any) => state.global.contextMenuPosition);
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const handleClose = () => {
        dispatch(globalActions.setContextMenu());
    };

    const handleRestore = async () => {
        try {
            await Promise.all(selectedFiles.map(restoreFile));

            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FileRestoredSuccessfully')}`
                    : `${i18next.t('messages.FilesRestoredSuccessfully')}`;
            dispatch(filesActions.setFiles(await getTrashFiles()));
            dispatch(notificationsActions.setSimpleOpen(message));
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedRestoreFile')}`
                    : `${i18next.t('messages.FailedRestoreFiles')}`;
            toast.error(message);
        } finally {
            handleClose();
        }
    };

    const handleRemove = async () => {
        dispatch(popupActions.setRemove());
        handleClose();
    };

    return (
        <Menu
            sx={{
                '& .MuiPaper-root': {
                    padding: 0,
                    borderRadius: '8px',
                },
            }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={contextMenu}
            keepMounted={true}
            anchorEl={null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{
                top: contextMenuPosition.y,
                left: contextMenuPosition.x,
            }}
            dir={dir}
        >
            <MenuList sx={{ width: 300 }} dense>
                <Restore handleClick={handleRestore} />
                <Remove handleClick={handleRemove} />
            </MenuList>
        </Menu>
    );
};

export default TrashContextMenu;
