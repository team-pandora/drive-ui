import Divider from '@mui/material/Divider';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { PermissionButton } from './PermissionsButton';
import { PermissionType } from './PermissionType';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                marginRight: theme.spacing(1.5),
            },
        },
    },
}));

const getUserStringPermission = (userPermission: string) => {
    switch (userPermission) {
        case 'write':
            return `${i18next.t('permissions.Write')}`;
        case 'read':
            return `${i18next.t('permissions.Read')}`;
        default:
            return `${i18next.t('permissions.Write')}`;
    }
};

const PermissionMenu: React.FC<{ permission: string }> = (props) => {
    const dir = i18next.dir(i18next.language);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const permission = getUserStringPermission(props.permission);

    return (
        <Box>
            <PermissionButton userPermission={permission} handleClick={handleClick} />
            <StyledMenu
                dir={dir}
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <PermissionType label={i18next.t('permissions.Read')} checked={true} onClick={handleClose} />
                <PermissionType label={i18next.t('permissions.Write')} checked={true} onClick={handleClose} />

                <Divider sx={{ my: 0.5 }} />

                <PermissionType label={i18next.t('permissions.Ownership')} checked={false} onClick={handleClose} />
                <PermissionType label={i18next.t('permissions.RemoveAccess')} checked={false} onClick={handleClose} />
            </StyledMenu>
        </Box>
    );
};

export default PermissionMenu;
