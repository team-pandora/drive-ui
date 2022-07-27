import i18next from 'i18next';
import {
    getFavoriteFiles,
    getFiles,
    getRecentFiles,
    getSharedFiles,
    getStorageFiles,
    getTrashFiles,
} from '../api/files';

export const fileSizeFormatter = (size: number) => {
    const KB = Math.floor(size / 1000);
    const MB = Math.floor(KB / 1000);
    const GB = Number((MB / 1000).toFixed(2));

    if (GB >= 0.1) return `${GB} GB`;

    if (MB >= 0.1) return `${MB} MB`;

    if (KB >= 0.1) return `${KB} KB`;

    if (size >= 0.1) return `${size} B`;

    return '-';
};

export const selectGetFilesFunc = () => {
    switch (window.location.pathname) {
        case '/my-drive':
            return getFiles;
        case '/trash':
            return getTrashFiles;
        case '/favorites':
            return getFavoriteFiles;
        case '/shared':
            return getSharedFiles;
        case '/recently':
            return getRecentFiles;
        case '/storage':
            return getStorageFiles;
        default:
            return getFiles;
    }
};

export const getRootPath = (file: any) => {
    if (file.trash) {
        return `trash`;
    }
    if (file.permission === 'owner') {
        return `my-drive`;
    }
    return `shared`;
};

export const getFileType = (file: any) => {
    if (file.type === 'file') {
        return file.name.split('.').at(-1) === file.name ? 'file' : file.name.split('.').at(-1);
    }
    return file.type;
};

export const getSelectedFilesIds = (files: any) => {
    return files.map((file: any) => {
        return file.fsObjectId;
    });
};
