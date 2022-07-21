import { Avatar, styled } from '@mui/material';
import { useState } from 'react';

const AvatarIcon = styled(Avatar)({
    width: '26px',
    height: '26px',
});

const AvatarIconFull = styled(Avatar)({
    width: '80px',
    height: '80px',
    fontSize: '64px',
});

function stringAvatar(name: string, color: string) {
    return {
        sx: {
            bgcolor: `${'pink'}`,
        },
        children: name[0],
    };
}

type props = {
    name: string;
    color: string;
};

const AvatarHoverDetails: React.FC<props> = ({ name, color }) => {
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
        setShowAvatarMenu(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowAvatarMenu(true);
    };

    return (
        <>
            <Avatar
                {...stringAvatar(name, color)}
                sx={{
                    width: '23px',
                    height: '23px',
                }}
            />
        </>
    );
};

export default AvatarHoverDetails;
