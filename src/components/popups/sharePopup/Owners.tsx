import { Box, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import getRandomColor from '../../../utils/time';
import UserDetail from './UserDetails';

const OwnersBox = styled(Box)({
    marginTop: '2.5%',
    maxHeight: '200px',
});

const Owners = () => {
    const filePermissionsData = useSelector((state: any) => state.permissions.filePermissionsData);
    return (
        <>
            <Typography fontSize={'18px'} m={'2%'} sx={{ userSelect: ' none' }}>
                {`${i18next.t('titles.PeopleWithAccess')}`}
            </Typography>
            <OwnersBox sx={{ overflowY: `${filePermissionsData.permittedUsers.length > 3 ? 'scroll' : 'hidden'}` }}>
                {filePermissionsData.permittedUsers.map((user: any, index: number) => {
                    return (
                        <UserDetail
                            key={index}
                            user={{
                                id: user.state.userId,
                                fsObjectId: user.state.fsObjectId,
                                fullName: user.user.fullName,
                                mail: user.user.mail,
                                permission: user.state.permission,
                                color: getRandomColor(user.user.fullName),
                            }}
                        />
                    );
                })}
            </OwnersBox>
        </>
    );
};

export default Owners;
