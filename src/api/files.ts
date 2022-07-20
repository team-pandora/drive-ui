/* eslint-disable no-underscore-dangle */
import Axios from 'axios';
import { getRootPath } from '../utils/files';
import { checkIfRecent } from '../utils/time';
/* eslint-disable consistent-return */

export const getFiles = async (parent: string) => {
    if (parent === 'null') {
        return (await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&trash=false&permission=owner`))
            .data;
    }
    return (await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&trash=false`)).data;
};

export const getSharedFiles = async (parent: string) => {
    return (
        await Axios.get(
            `http://localhost/api/users/fs/query?parent=${parent}&trash=false&permission=write&permission=read`,
        )
    ).data;
};

export const getRecentFiles = async (parent: string) => {
    const myDriveFiles = await getFiles(parent);
    const sharedFiles = await getSharedFiles(parent);
    const recentFiles = [...myDriveFiles, ...sharedFiles];
    return recentFiles.filter((file) => checkIfRecent(file.stateUpdatedAt));
};

export const getFavoriteFiles = async (parent: string) => {
    return (await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&favorite=true&trash=false`)).data;
};

export const getTrashFiles = async () => {
    return (await Axios.get(`http://localhost/api/users/fs/query?trash=true`)).data;
};

export const getStorageFiles = async () => {
    return (await Axios.get(`http://localhost/api/users/fs/query?trash=false&permission=owner&type=file`)).data;
};

export const getSubfolders = async (parent: string | null) => {
    if (parent === 'shared') {
        return (
            await Axios.get(
                `http://localhost/api/users/fs/query?trash=false&type=folder&root=true&permission=read&permission=write`,
            )
        ).data;
    }
    if (!parent) {
        return (
            await Axios.get(`http://localhost/api/users/fs/query?parent=null&trash=false&permission=owner&type=folder`)
        ).data;
    }

    return (await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&trash=false&type=folder`)).data;
};

export const addToFavorite = async (file: any) => {
    await Axios.post(`http://localhost/api/users/fs/${file.fsObjectId}/favorite`);
};

export const removeFromFavorite = async (file: any) => {
    await Axios.delete(`http://localhost/api/users/fs/${file.fsObjectId}/favorite`);
};

export const getFile = async (fsOjbectId: string) => {
    return (await Axios.get(`http://localhost/api/users/fs/query/${fsOjbectId}`)).data;
};

export const download = async (file: any) => {
    // TODO: handle error
    try {
        Axios.get(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/download`);
        window.location.href = `http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/download`;
    } catch (error) {
        window.location.href = `http://localhost/my-drive`;
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
    await Axios.post('http://localhost/api/users/fs/folder', {
        name,
        parent,
    });
};

export const RenameFile = async (file: any, newName: string) => {
    await Axios.patch(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}`, { name: newName });
};

export const uploadFile = async (file: any, parent: string) => {
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
};

export const moveToTrash = async (file: any) => {
    await Axios.post(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/trash`);
};

export const restoreFile = async (file: any) => {
    await Axios.post(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/restore`);
};

export const deleteFile = async (file: any) => {
    await Axios.delete(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}/trash`);
};

export const getUser = async () => {
    return (await Axios.get(`http://localhost/api/users/info`)).data;
};

export const getPermittedUsers = async (fsObjectId: string) => {
    return (await Axios.get(`/api/users/fs/${fsObjectId}/shared`)).data;
};

export const shareFile = async (fsObjectId: string, userId: string, permission: string) => {
    return (await Axios.post(`http://localhost/api/users/fs/${fsObjectId}/share`, { userId, permission })).data;
};

export const getQuota = async () => {
    return (await Axios.get(`http://localhost/api/users/quota`)).data;
};

export const createShortcut = async (fsObjectId: string, name: string, parent: string) => {
    const response = await Axios.post('http://localhost/api/users/fs/shortcut', {
        ref: fsObjectId,
        parent,
        name,
    });
    return response.data;
};

export const move = async (fsObjectId: string, newParent: string, fileType: 'file' | 'folder' | 'shortcut') => {
    const response = await Axios.patch(`http://localhost/api/users/fs/${fileType}/${fsObjectId}`, {
        parent: newParent,
    });
    return response.data;
};

export const copy = async (fsObjectId: string, name: string, parent: string) => {
    const response = await Axios.post(`http://localhost/api/users/fs/file/${fsObjectId}/duplicate`, {
        name,
        parent,
        client: 'Driveclient',
    });
    return response.data;
};

export const getFullPath = async (fsObjectId: string) => {
    const hierarchy = (await Axios.get(`http://localhost/api/users/fs/${fsObjectId}/hierarchy`)).data;
    if (hierarchy.length === 0) {
        const file: any = (await Axios.get(`http://localhost/api/users/fs/query/${fsObjectId}`)).data;
        return getRootPath(file);
    }
    const file = (await Axios.get(`http://localhost/api/users/fs/query/${hierarchy[0]._id}`)).data;
    return `${getRootPath(file)}/${hierarchy.map((currFile: any) => currFile.name).join('/')}`;
};

export const generateShareLink = async (fsObjectId: string, permission: string, expirationInSec: number) => {
    return Axios.post(`/api/users/fs/${fsObjectId}/share/token`, { permission, expirationInSec });
};

export const getOwnerOfFile = async (fsObjectId: string) => {
    return Axios.get(`/api/users/fs/${fsObjectId}/owner`);
};
