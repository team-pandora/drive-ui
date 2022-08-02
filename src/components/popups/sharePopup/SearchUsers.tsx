import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchAutoComplete from './AutoComplete';
import GivePermissionMenu from './permissions/GivePermissionMenu';
import { permissionActions } from '../../../store/permissions';
import { Permissions } from '../../../constants';

const SBox = styled(Box)({
    width: '620px',
    height: '50px',
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'center',
});

const SearchUsers = () => {
    const dispatch = useDispatch();
    const selectedUsers = useSelector((state: any) => state.users.selectedUsers);
    const filePermissionsData = useSelector((state: any) => state.permissions.filePermissionsData);
    useEffect(() => {
        const startingPermissionValue =
            filePermissionsData.currentUserPermission === Permissions.owner ||
            filePermissionsData.currentUserPermission === Permissions.write
                ? Permissions.write
                : Permissions.read;
        dispatch(permissionActions.setPermission(startingPermissionValue));
    }, [filePermissionsData]);

    return (
        <SBox>
            <SearchAutoComplete />
            {selectedUsers.length > 0 && <GivePermissionMenu />}
        </SBox>
    );
};

export default SearchUsers;
