/* eslint-disable consistent-return */
import Axios from 'axios';
import { handleError } from './error';

export const getFiles = async (parent: string) => {
    try {
        // TODO: parent null returning nested folders
        const response = await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}&trash=false`);
        return response.data;
    } catch (error: any) {
        handleError(error, window.location.pathname.slice(1));
    }
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

export const getSubfolders = async (parent: string | null) => {
    try {
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

export const downloadFile = async (fileId: string) => {
    const response = await Axios.get(
        `http://localhost/api/storage/bucket/62655a5dd681ae7e5f9eafe0/key/62655a5dd681ae7e5f9eafe2`,
    );
    const data = await response.data;
    console.log(data);
    return data;
};

export const createFile = async (file: any) => {
    const response = await Axios.post('http://localhost:8000/api/users/62655a5dd681ae7e5f9eafe0/fs/file', {
        name: 'alive4',
        parent: null,
        key: 'string',
        bucket: 'string',
        size: 50,
        public: false,
        source: 'drive',
    });
    const data = await response.data;
    console.log(data);
};

export const createFolder = async (name: string, parent: string | null) => {
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

export const getPermittedUsers = async (fileId: string) => {
    try {
        const response = await Axios.get(`http://localhost/api/users/fs/query?parent=${fileId}`);
        const data = await response.data;
        return data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};
