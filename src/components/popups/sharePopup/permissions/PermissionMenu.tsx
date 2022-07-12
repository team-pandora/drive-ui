import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import i18next from 'i18next';
import { useState } from 'react';

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

type props = { permission: string };

const PermissionMenu: React.FC<props> = ({ permission }) => {
    const dir = i18next.dir(i18next.language);
    const permissions = [i18next.t('permissions.Read'), i18next.t('permissions.Write')];
    const [value, setValue] = useState(`${i18next.t('permissions.Write')}`);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <Box>
            <FormControl hiddenLabel variant="filled" sx={{ m: 1, width: 150, height: 40, top: '4px' }} size="small">
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={value}
                    onChange={handleChange}
                >
                    <MenuItem dir={dir} value={permissions[0]}>
                        {permissions[0]}
                    </MenuItem>
                    <MenuItem dir={dir} value={permissions[1]}>
                        {permissions[1]}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default PermissionMenu;
