import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import SearchAutoComplete from './AutoComplete';
import PermissionMenu from './permissions/PermissionMenu';

const SBox = styled(Box)({
    width: '620px',
    height: '50px',
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
});

const SearchBox = () => {
    const selectedUsers = useSelector((state: any) => state.users.users);

    return (
        <SBox>
            <SearchAutoComplete />
            {selectedUsers.length > 0 && <PermissionMenu permission="owner owner" />}
        </SBox>
    );
};

export default SearchBox;
