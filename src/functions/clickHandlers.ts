import { filesActions } from '../store/files';
import { globalActions } from '../store/global';
import { popupActions } from '../store/popups';
import { handleRemoveFiles } from './apiHandlers';

export const handleClick = (event: React.MouseEvent<unknown>, file: any, selectedFiles: any, dispatch: any) => {
    const selectedIndex = selectedFiles.indexOf(file);
    console.log(file);
    let newSelected: readonly string[] = [];

    if (!file) {
        dispatch(filesActions.setSelected([]));
        return;
    }

    if (event.ctrlKey) {
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedFiles, file);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedFiles.slice(1));
        } else if (selectedIndex === selectedFiles.length - 1) {
            newSelected = newSelected.concat(selectedFiles.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedFiles.slice(0, selectedIndex),
                selectedFiles.slice(selectedIndex + 1),
            );
        }

        dispatch(filesActions.setSelected(newSelected));
    } else {
        dispatch(filesActions.setSelected([file]));
    }
};

export const handleKeyDown = async (event: any, files: any, selectedFiles: any, dispatch: any) => {
    if (event.key === 'Delete') {
        // await delete files
        const url = window.location.pathname.split('/')[1];
        if (url === 'trash') {
            dispatch(popupActions.setRemove());
        } else {
            handleRemoveFiles(selectedFiles, dispatch);
        }
    } else if (event.key === 'Escape') {
        dispatch(filesActions.setSelected([]));
    } else if ((event.key === 'a' || event.key === 'ש') && event.ctrlKey) {
        event.preventDefault();
        const allRowsNames = files.map((file: any) => file);
        dispatch(filesActions.setSelected(allRowsNames));
    } else if (event.key === 'ArrowUp') {
        const newIndex = files.indexOf(selectedFiles[0]) - 1 >= 0 ? files.indexOf(selectedFiles[0]) - 1 : 0;
        dispatch(filesActions.setSelected([files[newIndex]]));
    } else if (event.key === 'ArrowDown') {
        const newIndex =
            files.indexOf(selectedFiles[0]) + 1 < files.length ? files.indexOf(selectedFiles[0]) + 1 : files.length - 1;
        dispatch(filesActions.setSelected([files[newIndex]]));
    }
};

export const handleContextMenuClick = (
    event: React.MouseEvent<unknown>,
    file: any,
    selectedFiles: any,
    dispatch: any,
) => {
    event.preventDefault();
    if (selectedFiles.length <= 1) {
        dispatch(filesActions.setSelected([file]));
    }
    dispatch(globalActions.setContextMenu());
    dispatch(globalActions.setContextMenuPosition({ x: event.clientX, y: event.clientY }));
};

export const handleDoubleClick = async (event: any, file: any, history: any, dispatch: any) => {
    if (file.type === 'folder') {
        dispatch(filesActions.setHierarchy({ type: 'push', content: { id: file.fsObjectId, name: file.name } }));
        dispatch(filesActions.setParentFolderId(file.fsObjectId));
        history.push(`/folder/${file.fsObjectId}`);
        dispatch(filesActions.setSelected([]));
    }
};
