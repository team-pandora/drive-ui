import { Box, ListItemText, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import UserAvatar from '../../layout/Avatar';
import PermissionMenu from './permissions/PermissionMenu';

const UserTab = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
});

type props = {
    user: { permission: string; fullName: string; mail: string; color: string };
};

const UserDetail: React.FC<props> = ({ user }) => {
    const dir = i18next.dir(i18next.language);

    return (
        <UserTab sx={{ direction: dir }}>
            <UserAvatar name={user.fullName} color={user.color} isDisabled={false} />
            <ListItemText sx={{}}>
                <Typography variant="body2">{user.fullName}</Typography>
                <Typography variant="caption">{user.mail}</Typography>
            </ListItemText>

            {user.permission !== 'owner' && <PermissionMenu permission={`${user.permission}`} />}

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
