import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18next from 'i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Permissions } from '../../../../constants/index';

type props = { permission: string; changePermission: (newPermission: string) => void };

const ChangePermissionMenu: React.FC<props> = ({ permission, changePermission }) => {
    const dir = i18next.dir(i18next.language);
    const filePermissionsData = useSelector((state: any) => state.permissions.filePermissionsData);
    const [value, setValue] = useState(permission);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        changePermission(event.target.value);
    };

    return (
        <Box>
            <FormControl hiddenLabel variant="outlined" sx={{ m: 1, width: 150, height: 40, top: '4px' }} size="small">
                <Select
                    disabled={filePermissionsData.currentUserPermission === Permissions.read}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={value}
                    onChange={handleChange}
                >
                    <MenuItem dir={dir} value={Permissions.read}>
                        {`${i18next.t('permissions.Read')}`}
                    </MenuItem>
                    <MenuItem
                        disabled={filePermissionsData.currentUserPermission === Permissions.read}
                        dir={dir}
                        value={Permissions.write}
                    >
                        {`${i18next.t('permissions.Write')}`}
                    </MenuItem>
                    <MenuItem
                        disabled={filePermissionsData.currentUserPermission === Permissions.read}
                        dir={dir}
                        value={Permissions.removeAccess}
                    >
                        {`${i18next.t('permissions.RemoveAccess')}`}
                    </MenuItem>
                    <MenuItem disabled={true} dir={dir} value={Permissions.ownership}>
                        {`${i18next.t('permissions.Ownership')}`}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ChangePermissionMenu;
