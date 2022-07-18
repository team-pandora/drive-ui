import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToFavorite, download, moveToTrash, removeFromFavorite } from '../../api/files';
import { filesActions } from '../../store/files';
import { globalActions } from '../../store/global';
import { notificationsActions } from '../../store/notifications';
import { popupActions } from '../../store/popups';
import { selectGetFilesFunc } from '../../utils/files';
import { Copy } from './buttons/Copy';
import Download from './buttons/Download';
import Favorite from './buttons/Favorite';
import Info from './buttons/Info';
import MoveTo from './buttons/MoveTo';
import Remove from './buttons/Remove';
import Rename from './buttons/Rename';
import Share from './buttons/Share';
import Shortcut from './buttons/Shortcut';
import Unfavorite from './buttons/Unfavorite';

type props = {
    page: string;
};

const ContextMenu: React.FC<props> = ({ page }) => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const contextMenu = useSelector((state: any) => state.global.contextMenu);
    const contextMenuPosition = useSelector((state: any) => state.global.contextMenuPosition);
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const handleClose = () => {
        dispatch(globalActions.setContextMenu());
    };

    const handleRemove = async () => {
        try {
            await Promise.all(selectedFiles.map(moveToTrash));

            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                    : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
            dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
            dispatch(notificationsActions.setContent(message));
            dispatch(notificationsActions.setSimpleOpen());
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedDeletingFile')}`
                    : `${i18next.t('messages.FailedDeletingFiles')}`;
            toast.error(message);
        } finally {
            handleClose();
        }
    };

    const handleAddFavorite = async () => {
        try {
            await Promise.all(selectedFiles.map(addToFavorite));

            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                    : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
            dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
            dispatch(notificationsActions.setContent(message));
            dispatch(notificationsActions.setSimpleOpen());
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedDeletingFile')}`
                    : `${i18next.t('messages.FailedDeletingFiles')}`;
            toast.error(message);
        } finally {
            handleClose();
        }
    };

    const handleRemoveFavorite = async () => {
        try {
            await Promise.all(selectedFiles.map(removeFromFavorite));

            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                    : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
            dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
            dispatch(notificationsActions.setContent(message));
            dispatch(notificationsActions.setSimpleOpen());
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedDeletingFile')}`
                    : `${i18next.t('messages.FailedDeletingFiles')}`;
            toast.error(message);
        } finally {
            handleClose();
        }
    };

    const handleRename = () => {
        dispatch(popupActions.setRename());
        handleClose();
    };

    const handleDownload = async () => {
        try {
            // arab
            for (let i = 0; i <= selectedFiles.length; i += 1) {
                (function (ind) {
                    setTimeout(function () {
                        download(selectedFiles[ind]);
                    }, 100 * ind);
                })(i);
            }
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedDeletingFile')}`
                    : `${i18next.t('messages.FailedDeletingFiles')}`;
            toast.error(message);
        } finally {
            handleClose();
        }
    };

    const handleShare = () => {
        dispatch(popupActions.setShare());
        handleClose();
    };

    const handleCopy = () => {
        dispatch(popupActions.setNavigation());
        dispatch(popupActions.setNavigationState('copy'));
        handleClose();
    };

    const handleShortcut = () => {
        dispatch(popupActions.setNavigation());
        dispatch(popupActions.setNavigationState('shortcut'));
        handleClose();
    };

    const handleMove = () => {
        dispatch(popupActions.setNavigation());
        dispatch(popupActions.setNavigationState('move'));
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
            <MenuList sx={{ width: 300, paddingTop: '4px', paddingBottom: '4px' }} dense>
                <Share handleClick={handleShare} />
                <Shortcut handleClick={handleShortcut} fsObjectId={selectedFiles[0]?.fsObjectId} />
                <MoveTo handleClick={handleMove} fsObjectId={selectedFiles[0]?.fsObjectId} />
                {/* TODO */}
                {selectedFiles[0]?.favorite ? (
                    <Unfavorite handleClose={handleRemoveFavorite} />
                ) : (
                    <Favorite handleClose={handleAddFavorite} />
                )}
                <Copy handleClick={handleCopy} fsObjectId={selectedFiles[0]?.fsObjectId} />
                {selectedFiles.length === 1 && <Rename handleClick={handleRename} />}
                <Divider />
                {selectedFiles.length === 1 && <Info handleClose={handleClose} />}
                <Download handleClose={handleDownload} />
                <Divider />
                <Remove handleClick={handleRemove} />
            </MenuList>
        </Menu>
    );
};

export default ContextMenu;
