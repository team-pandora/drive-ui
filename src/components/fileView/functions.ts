// import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { filesActions } from '../../store/files';
import { globalActions } from '../../store/global';
import { notificationsActions } from '../../store/notifications';

// const dispatch = useDispatch();

export const handleClick = (event: React.MouseEvent<unknown>, file: any, selectedFiles: any, dispatch: any) => {
    const selectedIndex = selectedFiles.indexOf(file);
    let newSelected: readonly string[] = [];

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

export const handleKeyDown = (event: any, files: any, selectedFiles: any, dispatch: any) => {
    console.log(event);

    if (event.key === 'Delete') {
        // await delete files
        const message =
            selectedFiles.length === 1
                ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
        dispatch(notificationsActions.setContent(message));
        dispatch(notificationsActions.setSimpleOpen());
    } else if (event.key === 'Escape') {
        dispatch(filesActions.setSelected([]));
    } else if (event.key === 'a' && event.ctrlKey) {
        event.preventDefault();
        const allRowsNames = files.map((file: any) => file);
        dispatch(filesActions.setSelected(allRowsNames));
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

export const handleDoubleClick = (event: any, file: any, history: any, dispatch: any) => {
    history.push(`/folder/${file.fsObjectId}`);
    dispatch(filesActions.setHierarchy(file));
    dispatch(filesActions.setSelected([]));
};

export const isSelected = (file: any, selectedFiles: any) => {
    return selectedFiles.some((fileObject: any) => fileObject === file);
};
