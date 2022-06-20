import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../store/global';
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

    const handleClickRestore = () => {
        dispatch(globalActions.setContextMenu());
        alert(selectedFiles);
    };

    return (
        <Menu
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
                <Restore handleClick={handleClickRestore} />
                <Remove handleClose={handleClose} />
            </MenuList>
        </Menu>
    );
};

export default TrashContextMenu;
