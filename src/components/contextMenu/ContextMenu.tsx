import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../store/global';
import Copy from './buttons/Copy';
import Download from './buttons/Download';
import ExternalTransfer from './buttons/ExternalTransfer';
import Favorite from './buttons/Favorite';
import Info from './buttons/Info';
import MoveTo from './buttons/MoveTo';
import Remove from './buttons/Remove';
import Rename from './buttons/Rename';
import Share from './buttons/Share';
import Shortcut from './buttons/Shortcut';

const ContextMenu = () => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const contextMenu = useSelector((state: any) => state.global.contextMenu);
    const contextMenuPosition = useSelector((state: any) => state.global.contextMenuPosition);
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const handleClose = () => {
        dispatch(globalActions.setContextMenu());
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
                <Favorite handleClose={handleClose} />
                <Rename handleClose={handleClose} />
                <Divider />
                <Copy handleClose={handleClose} />
                <ExternalTransfer handleClose={handleClose} />
                <Divider />
                <Info handleClose={handleClose} />
                <Download handleClose={handleClose} />
                <Divider />
                <Remove handleClick={handleClose} />
            </MenuList>
        </Menu>
    );
};

export default ContextMenu;
