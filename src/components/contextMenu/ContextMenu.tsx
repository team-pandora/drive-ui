import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../store/global';
import { notificationsActions } from '../../store/notifications';
import { popupActions } from '../../store/popups';
import { Copy } from './buttons/Copy';
import Download from './buttons/Download';
import ExternalTransfer from './buttons/ExternalTransfer';
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

    const handleRemove = () => {
        const message =
            selectedFiles.length === 1
                ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
        dispatch(notificationsActions.setContent(message));
        dispatch(notificationsActions.setSimpleOpen());
        handleClose();
    };

    const handleRename = () => {
        dispatch(popupActions.setRename());
        handleClose();
    };

    const handleDownload = () => {
        dispatch(notificationsActions.setSimpleOpen());
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
                <Share handleClose={handleClose} />
                <Shortcut handleClose={handleClose} />
                <MoveTo handleClose={handleClose} />
                {page !== 'Favorites' ? (
                    <Favorite handleClose={handleClose} />
                ) : (
                    <Unfavorite handleClose={handleClose} />
                )}
                <Rename handleClick={handleRename} />
                <Divider />
                <Copy handleClose={handleClose} />
                <ExternalTransfer handleClose={handleClose} />
                <Divider />
                <Info handleClose={handleClose} />
                <Download handleClose={handleDownload} />
                <Divider />
                <Remove handleClick={handleRemove} />
            </MenuList>
        </Menu>
    );
};

export default ContextMenu;
