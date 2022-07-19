import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import getRandomColor from '../../../utils/time';
import UserAvatar from '../Avatar';
import Help from './Help';
import Settings from './Settings';

const Icons = styled(Box)(() => ({
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
}));

const ToolBarIcons = () => {
    const currentUser = useSelector((state: any) => state.users.user);
    const userColor = getRandomColor(currentUser.fullName);

    return (
        <Icons>
            <Settings />
            <Help />
            <UserAvatar name={currentUser.fullName} color={userColor} isDisabled={false} />
        </Icons>
    );
};

export default ToolBarIcons;
