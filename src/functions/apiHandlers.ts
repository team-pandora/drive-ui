import i18next from 'i18next';
import { toast } from 'react-toastify';
import { createFolder, getFiles, moveToTrash, uploadFile } from '../api/files';
import { filesActions } from '../store/files';
import { notificationsActions } from '../store/notifications';
import { selectGetFilesFunc } from '../utils/files';

/* eslint-disable no-await-in-loop */
export const handleUploadFiles = (parentFolderId: string, dispatch: any, acceptedFiles: string[], history: any) => {
    if (parentFolderId === 'null') history.push('/my-drive');
    const filesWithStatus = acceptedFiles.map((file: any) => {
        return { name: file.name, type: 'file', status: 'uploading' };
    });

    dispatch(filesActions.setUploaded(filesWithStatus));
    dispatch(notificationsActions.setUploadOpen());

    for (const file of acceptedFiles) {
        uploadFile(file, parentFolderId)
            .then(async () => {
                dispatch(filesActions.setFiles(await getFiles(parentFolderId)));
                dispatch(filesActions.setUploadedDone(file));
            })
            .catch(() => {
                dispatch(filesActions.setUploadedFailed(file));
            });
    }
};

export const handleUploadFolder = async (filesArray: any[], dispatch: any) => {
    const parentFolderId =
        window.location.pathname.slice(1).split('/')[0] === 'folder'
            ? window.location.pathname.slice(1).split('/')[1]
            : null;

    const folders: any = {};

    const mainFolder = { name: filesArray[0].webkitRelativePath.split('/')[0], type: 'folder', status: 'uploading' };
    dispatch(filesActions.setUploaded([mainFolder]));
    dispatch(notificationsActions.setUploadOpen());

    for (const file of filesArray) {
        let path = file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf('/'));
        const arr = [];

        while (!folders[path] && path !== '') {
            arr.push(path);
            path = path.substring(0, path.lastIndexOf('/'));
        }

        for (let index = arr.length - 1; index >= 0; index -= 1) {
            const folder = await createFolder(
                arr[index].split('/').pop(),
                folders[arr[index].substring(0, arr[index].lastIndexOf('/'))] || parentFolderId,
            );

            folders[arr[index]] = folder.fsObjectId;
        }

        await uploadFile(file, folders[file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf('/'))]);
    }

    dispatch(filesActions.setUploadedDone(mainFolder));
    dispatch(filesActions.setFiles(await selectGetFilesFunc()(parentFolderId || 'null')));
};

export const handleRemoveFiles = async (selectedFiles: any[], dispatch: any) => {
    try {
        await Promise.all(selectedFiles.map(moveToTrash));

        const message =
            selectedFiles.length === 1
                ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                : `${i18next.t('messages.FilesDeletedSuccessfully')}`;
        dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
        dispatch(notificationsActions.setSimpleOpen(message));
        dispatch(filesActions.setSelected([]));
    } catch (error) {
        const message =
            selectedFiles.length === 1
                ? `${i18next.t('messages.FailedDeletingFile')}`
                : `${i18next.t('messages.FailedDeletingFiles')}`;
        toast.error(message);
    }
};
