import i18next from 'i18next';
import { toast } from 'react-toastify';
import { moveToTrash } from '../../api/files';
// import { useDispatch } from 'react-redux';
import { filesActions } from '../../store/files';
import { globalActions } from '../../store/global';
import { notificationsActions } from '../../store/notifications';
import { popupActions } from '../../store/popups';
import { selectGetFilesFunc } from '../../utils/files';

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

export const handleKeyDown = async (event: any, files: any, selectedFiles: any, dispatch: any) => {
    if (event.key === 'Delete') {
        // await delete files
        const url = window.location.pathname.split('/')[1];
        if (url === 'trash') {
            dispatch(popupActions.setRemove());
        } else {
            try {
                await Promise.all(selectedFiles.map(moveToTrash));

                const message =
                    selectedFiles.length === 1
                        ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                        : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
                dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
                dispatch(notificationsActions.setSimpleOpen(message));
            } catch (error) {
                const message =
                    selectedFiles.length === 1
                        ? `${i18next.t('messages.FailedDeletingFile')}`
                        : `${i18next.t('messages.FailedDeletingFiles')}`;
                toast.error(message);
            }
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
    } else if (event.key === 'F2') {
        dispatch(popupActions.setRename());
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

export const isSelected = (file: any, selectedFiles: any) => {
    return selectedFiles.some((fileObject: any) => fileObject === file);
};
