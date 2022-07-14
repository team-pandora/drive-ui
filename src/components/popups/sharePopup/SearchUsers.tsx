import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import SearchAutoComplete from './AutoComplete';
import GivePermissionMenu from './permissions/GivePermissionMenu';

const SBox = styled(Box)({
    width: '620px',
    height: '50px',
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
});

const SearchUsers = () => {
    const selectedUsers = useSelector((state: any) => state.users.users);

    return (
        <SBox>
            <SearchAutoComplete />
            {selectedUsers.length > 0 && <GivePermissionMenu permission="owner owner" />}
        </SBox>
    );
};

export default SearchUsers;
