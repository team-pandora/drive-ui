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
            bgcolor: `${color}`,
        },
        children: name[0],
    };
}

type props = {
    name: string;
    mail: string;
    color: string;
    isDisabled: boolean;
};

const AvatarHoverDetails: React.FC<props> = ({ name, mail, color, isDisabled }) => {
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
                    width: '28px',
                    height: '28px',
                }}
            />
            {/* </Tooltip> */}
            {/* <AvatarIcon {...stringAvatar(name, color)} /> */}
            {/* </IconButton> */}
            {/* <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={showAvatarMenu}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <ListItem sx={{ display: 'block', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: '500', color: '#202124' }}>{name}</Typography>
                    <Typography sx={{ fontSize: 'small', color: '#5f6368' }}>{mail}</Typography>
                </ListItem>
            </Menu> */}
        </>
    );
};

export default AvatarHoverDetails;
