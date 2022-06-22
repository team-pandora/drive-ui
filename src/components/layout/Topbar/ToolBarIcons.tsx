import { Box, styled } from '@mui/material';
import getRandomColor from '../../../utils/time';
import UserAvatar from '../Avatar';
import Help from './Help';
import Settings from './Settings';

const userColor = getRandomColor();

const Icons = styled(Box)(() => ({
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
}));

const ToolBarIcons = () => {
    // TODO: get user data
    const name = 'John Doe';
    const mail = 'maya.fisher@gmail,com';

    return (
        <Icons>
            <Settings />
            <Help />
            <UserAvatar name={name} color={userColor} />
        </Icons>
    );
};

export default ToolBarIcons;
