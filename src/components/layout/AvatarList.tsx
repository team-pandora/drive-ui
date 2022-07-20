import { Avatar, Box, IconButton, Menu, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { Fragment, useState } from 'react';
import UserAvatar from './Avatar';

const AvatarIcon = styled(Avatar)({
    width: '32px',
    height: '32px',
});

const AvatarIconFull = styled(Avatar)({
    width: '80px',
    height: '80px',
    fontSize: '64px',
});

const SBox = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const TextBoxStyle = styled(Box)({
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'end',
});

function stringAvatar(name: string, color: string) {
    return {
        sx: {
            bgcolor: `${color}`,
        },
        children: name,
    };
}

type props = {
    name: string;
    color: string;
    extraUsers: {
        name: string;
        mail: string;
        color: string;
    }[];
};

const AvatarList: React.FC<props> = ({ name, color, extraUsers }) => {
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dir = i18next.dir(i18next.language);

    const handleClose = () => {
        setAnchorEl(null);
        setShowAvatarMenu(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowAvatarMenu(true);
    };

    const fixDir = dir === 'ltr' ? 'rtl' : 'ltr';

    return (
        <Fragment>
            <IconButton onClick={handleClick}>
                <AvatarIcon {...stringAvatar(name, color)} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={showAvatarMenu}
                onClose={handleClose}
                dir={fixDir}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        maxHeight: '370px',
                        width: '200px',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {extraUsers.map((user: { name: string; mail: string; color: string }, index) => {
                    return (
                        <SBox>
                            <TextBoxStyle>
                                <Typography sx={{ fontWeight: '500', color: '#202124' }}>{user.name}</Typography>
                                <Typography sx={{ fontSize: 'small', color: '#5f6368' }}>יכול/ה לערוך</Typography>
                            </TextBoxStyle>
                            <UserAvatar name={user.name} mail={user.mail} color={user.color} isDisabled={true} />
                        </SBox>
                    );
                })}
            </Menu>
        </Fragment>
    );
};

export default AvatarList;
