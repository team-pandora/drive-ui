import { getMyDriveFiles, getTrashFiles } from '../api/files';

export const fileSizeFormatter = (size: number) => {
    const KB = Math.floor(size / 1000);
    const MB = Math.floor(KB / 1000);
    const GB = Math.floor(MB / 1000);

    if (GB >= 0.1) return `${GB} GB`;

    if (MB >= 0.1) return `${MB} MB`;

    if (KB >= 0.1) return `${KB} KB`;

    return `${size}B`;
};

export const selectGetFilesFunc = () => {
    switch (window.location.pathname) {
        case '/my-drive':
            return getMyDriveFiles;
        case '/trash':
            return getTrashFiles;
        default:
            return getMyDriveFiles;
    }
};
