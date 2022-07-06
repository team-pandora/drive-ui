/* eslint-disable consistent-return */
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { getCookieValue } from '../utils/cookies';

export const getFile = async (parent: null | string) => {
    try {
        const response = await Axios.get(`http://localhost/api/users/fs/query?parent=${parent}`, {
            withCredentials: true,
        });
        const data = await response.data;
        return data;
    } catch (error: any) {
        if (error.request.status === StatusCodes.UNAUTHORIZED) {
            document.location.href = '/auth/login?relayState=/shared';
            return null;
        }
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

export const RenameFile = async (fileId: string, newName: string) => {
    const response = await Axios.get(
        `http://127.0.0.1:8000/api/users/62655a5dd681ae7e5f9eafe0/fsObjects/states?parent=${null}`,
    );
};

export const uploadFile = async (file: any) => {
    const response = await Axios.post(`http://localhost:8000/api/users/fs/file/maya/true/${null}`, {
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
