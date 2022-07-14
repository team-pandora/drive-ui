import { Box, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPermittedUsers } from '../../../api/files';
import { getCurrentUser } from '../../../api/users';
import { IServerError } from '../../../utils/types';
import UserDetail from './UserDetails';

const OwnersBox = styled(Box)({
    marginTop: '2.5%',
    maxHeight: '200px',
});

const Owners = () => {
    const [permittedUsers, setPermittedUsers] = useState<any[]>([]);
    const selectedFiles = useSelector((state: any) => state.files.selected);
    // TODO: get current user from store
    const [currentUser, setUser] = useState<any>();
    const [myPermission, setMyPermission] = useState<string>('');

    useQuery('getCurrentUser', () => getCurrentUser(), {
        onError: (error: IServerError) => {
            toast.error('Failed loading current users');
        },
        onSuccess: (data) => {
            setUser(data);
        },
    });

    const dispatch = useDispatch();
    const { isLoading } = useQuery('permittedUsers', () => getPermittedUsers(selectedFiles[0].fsObjectId), {
        onError: (error: IServerError) => {
            toast.error('Failed loading shared users');
        },
        onSuccess: (data) => {
            setPermittedUsers(data);
            setMyPermission(permittedUsers.find((user: any) => user.state.userId === currentUser.id).state.permission);
        },
    });

    return (
        <>
            <Typography fontSize={'18px'} m={'2%'}>
                {`${i18next.t('titles.PeopleWithAccess')}`}
            </Typography>
            <OwnersBox sx={{ overflowY: `${permittedUsers.length > 3 ? 'scroll' : 'hidden'}` }}>
                {permittedUsers.map((user: any) => {
                    return (
                        <UserDetail
                            key={user.user.email}
                            user={{
                                id: user.state.userId,
                                fullName: user.user.fullName,
                                mail: user.user.mail,
                                permission: user.state.permission,
                                color: 'lightblue',
                            }}
                        />
                    );
                })}
            </OwnersBox>
        </>
    );
};

export default Owners;
