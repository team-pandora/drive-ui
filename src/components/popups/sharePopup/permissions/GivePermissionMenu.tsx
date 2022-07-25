import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import i18next from 'i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filesActions } from '../../../../store/files';

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

type props = { permission: string };

const GivePermission: React.FC<props> = ({ permission }) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const permissions = ['read', 'write', 'RemoveAccess', 'Ownership'];
    const [value, setValue] = useState('write');
    const [user, setUser] = useState<any>();

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        dispatch(filesActions.setPermission(event.target.value));
    };

    const getUserStringPermission = (userPermission: string) => {
        switch (userPermission) {
            case 'write':
                return `${i18next.t('permissions.Write')}`;
            case 'read':
                return `${i18next.t('permissions.Read')}`;
            case 'RemoveAccess':
                return `${i18next.t('permissions.RemoveAccess')}`;
            case 'Ownership':
                return `${i18next.t('permissions.Ownership')}`;
            default:
                return `${i18next.t('permissions.Write')}`;
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl hiddenLabel variant="filled" sx={{ mx: 1, width: 150 }} size="medium">
                <Select
                    disabled={permission === 'owner'}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={value}
                    sx={{ '& .MuiSelect-select ': { top: '10px', padding: '14px 32px 18px 12px' } }}
                    onChange={handleChange}
                >
                    <MenuItem dir={dir} value={permissions[0]}>
                        {getUserStringPermission(permissions[0])}
                    </MenuItem>
                    <MenuItem dir={dir} value={permissions[1]}>
                        {getUserStringPermission(permissions[1])}
                    </MenuItem>
                    <MenuItem dir={dir} value={permissions[2]}>
                        {getUserStringPermission(permissions[2])}
                    </MenuItem>
                    <MenuItem dir={dir} value={permissions[3]}>
                        {getUserStringPermission(permissions[3])}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default GivePermission;
