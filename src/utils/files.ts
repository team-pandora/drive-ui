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
    const dir = i18next.dir(i18next.language);

    const KB = Math.floor(size / 1000);
    const MB = Math.floor(KB / 1000);
    const GB = Math.floor(MB / 1000);

    if (GB >= 0.1) return dir === 'ltr' ? `${GB} GB` : `GB ${GB}`;

    if (MB >= 0.1) return dir === 'ltr' ? `${MB} MB` : `MB ${MB}`;

    if (KB >= 0.1) return dir === 'ltr' ? `${KB} KB` : `KB ${KB}`;

    if (size >= 0.1) return dir === 'ltr' ? `${size} B` : `B ${size}`;

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
