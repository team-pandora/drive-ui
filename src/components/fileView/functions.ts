// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filesActions } from '../../store/files';
import { globalActions } from '../../store/global';

// const dispatch = useDispatch();

export const handleClick = (event: React.MouseEvent<unknown>, file: any, selectedFiles: any, dispatch: any) => {
    const selectedIndex = selectedFiles.indexOf(file.stateId);
    let newSelected: readonly string[] = [];

    if (event.ctrlKey) {
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedFiles, file.stateId);
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
        dispatch(filesActions.setSelected([file.stateId]));
    }
};

export const handleSelectAllClick = (event: any, files: any, dispatch: any) => {
    if (event.key === 'a' && event.ctrlKey) {
        event.preventDefault();
        const allRowsNames = files.map((file: any) => file.stateId);
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
        dispatch(filesActions.setSelected([file.stateId]));
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
    return selectedFiles.some((fileObject: any) => fileObject === file.stateId);
};
