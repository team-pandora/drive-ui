import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { download } from '../../api/files';
import { handleRemoveFiles } from '../../functions/apiHandlers';
import { globalActions } from '../../store/global';
import { popupActions } from '../../store/popups';
import { getSelectedFilesIds } from '../../utils/files';
import { Copy } from './buttons/Copy';
import Download from './buttons/Download';
import Favorite from './buttons/Favorite';
import Info from './buttons/Info';
import MoveTo from './buttons/MoveTo';
import Remove from './buttons/Remove';
import Rename from './buttons/Rename';
import Share from './buttons/Share';
import Shortcut from './buttons/Shortcut';

type props = {
    page: string;
    disabled?: {
        share?: boolean;
        shortcut?: boolean;
        moveTo?: boolean;
        favorites?: boolean;
        copy?: boolean;
        rename?: boolean;
        info?: boolean;
        download?: boolean;
        remove?: boolean;
    };
};

const ContextMenu: React.FC<props> = ({ page, disabled }) => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const contextMenu = useSelector((state: any) => state.global.contextMenu);
    const contextMenuPosition = useSelector((state: any) => state.global.contextMenuPosition);
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const handleClose = () => {
        dispatch(globalActions.setContextMenu());
    };

    const handleRemove = async () => {
        handleRemoveFiles(selectedFiles, dispatch);
        handleClose();
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
                    }, 500 * ind);
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

    const checkFavorites = () => {
        return selectedFiles.every((file: any) => file.favorite === selectedFiles[0].favorite);
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
            <MenuList
                sx={{
                    width: 300,
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    outline: 'none',
                    border: 'none',
                    caretColor: 'transparent',
                }}
                dense
            >
                <Share handleClick={handleShare} />
                <Shortcut handleClick={handleShortcut} fsObjectIds={getSelectedFilesIds(selectedFiles)} />
                <MoveTo
                    handleClick={handleMove}
                    fsObjectIds={getSelectedFilesIds(selectedFiles)}
                    disabled={disabled!.moveTo}
                />
                <Favorite
                    action={selectedFiles[0]?.favorite ? 'Unfavorite' : 'Favorite'}
                    disabled={!checkFavorites()}
                />
                <Copy handleClick={handleCopy} fsObjectIds={getSelectedFilesIds(selectedFiles)} />
                <Rename handleClick={handleRename} disabled={selectedFiles.length !== 1} />
                <Divider />
                <Info handleClose={handleClose} disabled={selectedFiles.length !== 1} />
                <Download handleClick={handleDownload} />
                <Divider />
                <Remove handleClick={handleRemove} />
            </MenuList>
        </Menu>
    );
};

ContextMenu.defaultProps = {
    disabled: {
        share: false,
        shortcut: false,
        moveTo: false,
        favorites: false,
        copy: false,
        rename: false,
        info: false,
        download: false,
        remove: false,
    },
};

export default ContextMenu;
