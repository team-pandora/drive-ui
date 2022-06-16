import { HelpOutlineOutlined } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';
import getRandomColor from '../../../utils/time';
import UserAvatar from '../Avatar';
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
            {/* TODO: Help icon is going to change also */}
            <IconButton>
                <HelpOutlineOutlined sx={{ color: '#5f6368' }} />
            </IconButton>
            <UserAvatar name={name} color={userColor} />
        </Icons>
    );
};

export default ToolBarIcons;
