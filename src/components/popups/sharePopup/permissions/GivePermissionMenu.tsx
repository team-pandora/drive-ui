import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18next from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Permissions } from '../../../../constants';
import { permissionActions } from '../../../../store/permissions';

const GivePermission = () => {
    const dispatch = useDispatch();
    const filePermissionsData = useSelector((state: any) => state.permissions.filePermissionsData);
    const startingPermissionValue = useSelector((state: any) => state.permissions.selectedPermission);
    const dir = i18next.dir(i18next.language);

    const [value, setValue] = useState(startingPermissionValue);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        dispatch(permissionActions.setPermission(event.target.value));
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl hiddenLabel variant="filled" sx={{ mx: 1, width: 150 }} size="medium">
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={value}
                    label={value}
                    sx={{ '& .MuiSelect-select ': { top: '10px', padding: '14px 32px 18px 12px' } }}
                    onChange={handleChange}
                >
                    <MenuItem
                        disabled={filePermissionsData.currentUserPermission === Permissions.read}
                        dir={dir}
                        value={Permissions.write}
                    >
                        {`${i18next.t('permissions.Write')}`}
                    </MenuItem>
                    <MenuItem dir={dir} value={Permissions.read}>
                        {`${i18next.t('permissions.Read')}`}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default GivePermission;
