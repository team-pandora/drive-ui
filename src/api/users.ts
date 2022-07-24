import Axios from 'axios';

export const getUser = async () => {
    const res = await Axios.get(
        'http://kartoffel.branch-yesodot.org/api/entities/digitalIdentity/danielle5@jello.com?expanded=true',
    );
    const data = await res.data;
    return data;
};

export const getSharedUsers = async (name: string) => {
    if (name.length >= 2) {
        const res = await Axios.get(`api/users/users?query=${name}&source=es_name`);
        const data = await res.data;
        return data;
    }
    return [];
};

export const searchUsersByName = async (name: string) => {
    return [1, 2];
};

export const getCurrentUser = async () => {
    return Axios.get(`api/users/user`);
};
