/* eslint-disable no-underscore-dangle */
import Axios from 'axios';
import { getRootPath } from '../utils/files';
import { checkIfRecent } from '../utils/time';
/* eslint-disable consistent-return */
import { handleError } from './error';

export const getFiles = async (parent: string) => {
    try {
        // TODO: parent null returning nested folders
        if (parent === 'null') {
            return (
                await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&trash=false&permission=owner`)
            ).data;
        }
        return (await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&trash=false`)).data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const getSharedFiles = async (parent: string) => {
    try {
        return (
            await Axios.get(
                `http://localhost/api/users/fs/query?parent=${parent}&trash=false&permission=write&permission=read`,
            )
        ).data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const getRecentFiles = async (parent: string) => {
    const myDriveFiles = await getFiles(parent);
    const sharedFiles = await getSharedFiles(parent);
    const recentFiles = [...myDriveFiles, ...sharedFiles];
    return recentFiles.filter((file) => checkIfRecent(file.stateUpdatedAt));
};

export const getFavoriteFiles = async (parent: string) => {
    try {
        const response = await Axios.get(
            `http://localhost/api/users/fs/query?parent=${parent}&favorite=true&trash=false`,
        );
        return response.data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const getTrashFiles = async () => {
    try {
        const response = await Axios.get(`http://localhost/api/users/fs/query?trash=true`);
        return response.data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const getStorageFiles = async () => {
    try {
        return (await Axios.get(`http://localhost/api/users/fs/query?trash=false&permission=owner&type=file`)).data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const getSubfolders = async (parent: string | null) => {
    try {
        // arab
        if (parent === 'shared') {
            return (
                await Axios.get(
                    `http://localhost/api/users/fs/query?trash=false&type=folder&root=true&permission=read&permission=write`,
                )
            ).data;
        }
        if (!parent) {
            return (
                await Axios.get(
                    `http://localhost/api/users/fs/query?parent=null&trash=false&permission=owner&type=folder`,
                )
            ).data;
        }

        const response = await Axios.get(
            `http://localhost/api/users/fs/query?parent=${parent}&trash=false&type=folder`,
        );
        const data = await response.data;
        return data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const addToFavorite = async (file: any) => {
    try {
        await Axios.post(`http://localhost/api/users/fs/${file.fsObjectId}/favorite`);
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const removeFromFavorite = async (file: any) => {
    await Axios.delete(`http://localhost/api/users/fs/${file.fsObjectId}/favorite`);
};

export const getFile = async (fsOjbectId: string) => {
    const response = await Axios.get(`http://localhost/api/users/fs/query/${fsOjbectId}`);
    const data = await response.data;
    return data;
};

export const download = async (file: any) => {
    try {
        window.location.href = `http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/download`;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

// export const createFile = async (file: any) => {
//     const response = await Axios.post('http://localhost:8000/api/users/62655a5dd681ae7e5f9eafe0/fs/file', {
//         name: 'alive4',
//         parent: null,
//         key: 'string',
//         bucket: 'string',
//         size: 50,
//         public: false,
//         source: 'drive',
//     });
//     const data = await response.data;
// };

export const createFolder = async (name: string, parent: string | null | undefined) => {
    try {
        await Axios.post('http://localhost/api/users/fs/folder', {
            name,
            parent,
        });
    } catch (error) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const test = async () => {
    console.log('in test function');
};

export const RenameFile = async (file: any, newName: string) => {
    try {
        await Axios.patch(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}`, { name: newName });
    } catch (error) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const uploadFile = async (file: any, parent: string) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        await Axios.post(`http://localhost/api/users/fs/file`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: {
                name: file.name,
                size: file.size,
                parent,
                public: false,
                client: 'drive',
            },
        });
    } catch (error) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const moveToTrash = async (file: any) => {
    try {
        await Axios.post(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/trash`);
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const restoreFile = async (file: any) => {
    try {
        await Axios.post(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/restore`);
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const deleteFile = async (file: any) => {
    try {
        await Axios.delete(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/trash`);
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};

export const getUser = async () => {
    await Axios.get(`http://localhost/api/users/info`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            handleError(error, 'my-drive');
        });
};

export const getPermittedUsers = async (fsObjectId: string) => {
    try {
        const response = await Axios.get(`/api/users/fs/${fsObjectId}/shared`);
        const data = await response.data;
        return data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const shareFile = async (fsObjectId: string, userId: string, permission: string) => {
    try {
        const response = await Axios.post(`http://localhost/api/users/fs/${fsObjectId}/share`, { userId, permission });
        return response.data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const getQuota = async () => {
    try {
        return (await Axios.get(`http://localhost/api/users/quota`)).data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const createShortcut = async (fsObjectId: string, name: string, parent: string) => {
    try {
        const response = await Axios.post('http://localhost/api/users/fs/shortcut', {
            ref: fsObjectId,
            parent,
            name,
        });
        return response.data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const move = async (fsObjectId: string, newParent: string, fileType: 'file' | 'folder' | 'shortcut') => {
    try {
        const response = await Axios.patch(`http://localhost/api/users/fs/${fileType}/${fsObjectId}`, {
            parent: newParent,
        });
        return response.data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const copy = async (fsObjectId: string, name: string, parent: string) => {
    try {
        const response = await Axios.post(`http://localhost/api/users/fs/file/${fsObjectId}/duplicate`, {
            name,
            parent,
            client: 'Driveclient',
        });
        return response.data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const getFullPath = async (fsObjectId: string) => {
    try {
        const hierarchy = (await Axios.get(`http://localhost/api/users/fs/${fsObjectId}/hierarchy`)).data;
        if (hierarchy.length === 0) {
            const file: any = (await Axios.get(`http://localhost/api/users/fs/query/${fsObjectId}`)).data;
            return getRootPath(file);
        }
        const file = (await Axios.get(`http://localhost/api/users/fs/query/${hierarchy[0]._id}`)).data;
        return `${getRootPath(file)}/${hierarchy.map((currFile: any) => currFile.name).join('/')}`;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
};
