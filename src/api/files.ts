/* eslint-disable consistent-return */
import Axios from 'axios';
import { handleError } from './error';

export const getFile = async (parent: string) => {
    try {
        const response = await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}`, {
            withCredentials: true,
        });
        const data = await response.data;
        return data;
    } catch (error: any) {
        handleError(error, 'my-drive');
    }
};

export const downloadFile = async (fileId: string) => {
    const response = await Axios.get(
        `http://localhost:7000/api/storage/bucket/62655a5dd681ae7e5f9eafe0/key/62655a5dd681ae7e5f9eafe2`,
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

export const test = async () => {
    console.log('in test function');
};

export const RenameFile = async (file: any, newName: string) => {
    try {
        await Axios.patch(`http://localhost/api/users/fs/${file.type}/${file.fsObjectId}`, { name: newName });
    } catch (error) {
        handleError(error, window.location.pathname);
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
        handleError(error, parent);
    }
};
