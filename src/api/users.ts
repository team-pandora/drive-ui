import Axios from "axios";

export const getUser = async () => {
    const res = await Axios.get('http://kartoffel.branch-yesodot.org/api/entities/digitalIdentity/danielle5@jello.com?expanded=true');
    const data = await res.data;
    return data;
};

export const getSharedUsers = async () => {
    const res  = await Axios.get('http://kartoffel.branch-yesodot.org/api/entities?page=1&pageSize=20');
    const data = await res.data;
    return data;
}

// export default getUser