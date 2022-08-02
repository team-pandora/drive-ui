import { Box, ListItemText, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { handleErrorMsg } from '../../../api/error';
import { unshareFsObject, updateFsObjectPermission } from '../../../api/files';
import { Permissions } from '../../../constants';
import { notificationsActions } from '../../../store/notifications';
import UserAvatar from '../../layout/Avatar';
import ChangePermissionMenu from './permissions/ChangePermissionMenu';

const UserTab = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
});

type props = {
    user: { id: string; fsObjectId: string; permission: string; fullName: string; mail: string; color: string };
};

const UserDetail: React.FC<props> = ({ user }) => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();

    // TODO: refetch permittedUsers (owners file)
    const changePermission = async (newPermission: string) => {
        if (newPermission === Permissions.removeAccess) {
            unshareFsObject(user.fsObjectId, user.id)
                .then(() => {
                    dispatch(notificationsActions.setSimpleOpen(i18next.t('messages.RemovePermission')));
                })
                .catch(handleErrorMsg('Failed removing access', window.location.pathname.slice(1)));
        } else {
            updateFsObjectPermission(user.fsObjectId, user.id, newPermission)
                .then(() => {
                    dispatch(notificationsActions.setSimpleOpen(i18next.t('messages.PermissionChanged')));
                })
                .catch(handleErrorMsg('Failed changing permission', window.location.pathname.slice(1)));
        }
    };

    return (
        <UserTab sx={{ direction: dir }}>
            <UserAvatar name={user.fullName} mail={user.mail} color={user.color} isDisabled={false} />
            <ListItemText sx={{}}>
                <Typography variant="body2">{user.fullName}</Typography>
                <Typography variant="caption">{user.mail}</Typography>
            </ListItemText>

            {user.permission !== 'owner' && (
                <ChangePermissionMenu permission={`${user.permission}`} changePermission={changePermission} />
            )}

            {user.permission === 'owner' && (
                <Typography
                    sx={{
                        margin: '0px 4%',
                        color: 'lightgrey',
                    }}
                >
                    {`${i18next.t('buttons.Owner')}`}
                </Typography>
            )}
        </UserTab>
    );
};

export default UserDetail;
