import { Box, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPermittedUsers } from '../../../api/files';
import { filesActions } from '../../../store/files';
import getRandomColor from '../../../utils/time';
import { IServerError } from '../../../utils/types';
import UserDetail from './UserDetails';

const users = [
    {
        name: 'מאיה פישר (את/ה)',
        email: 'maya.fisher53@gmail.com',
        permission: 'owner',
        color: getRandomColor(),
    },
    {
        name: 'ירין בניסטי',
        email: 'yarin.benisty@gmail.com',
        permission: 'read',
        color: getRandomColor(),
    },
];

const OwnersBox = styled(Box)({
    marginTop: '2.5%',
    maxHeight: '200px',
    overflowY: `${users.length > 5 ? 'scroll' : 'hidden'}`,
});

const Owners = () => {
    const [permittedUsers, setPermittedUsers] = useState([]);
    const selectedFiles = useSelector((state: any) => state.files.selectedFiles);

    const dispatch = useDispatch();
    const { isLoading } = useQuery('permittedUsers', () => getPermittedUsers(selectedFiles), {
        onError: (error: IServerError) => {
            toast.error('Failed loading files');
        },
        onSuccess: (data) => {
            setPermittedUsers(data);
        },
    });

    return (
        <>
            <Typography fontSize={'18px'} m={'2%'}>
                {`${i18next.t('titles.PeopleWithAccess')}`}
            </Typography>
            <OwnersBox>
                {users.map((user) => {
                    return (
                        <UserDetail
                            key={user.email}
                            user={{
                                fullName: user.name,
                                mail: user.email,
                                permission: user.permission,
                                color: user.color,
                            }}
                        />
                    );
                })}
            </OwnersBox>
        </>
    );
};

export default Owners;
