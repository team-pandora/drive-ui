import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, styled } from '@mui/material';
import i18next from 'i18next';

const SearchBox = styled(Box)(() => ({
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,.04)',
    width: '640px',
    height: '50px',
    borderRadius: 10,
}));

const Search = styled('div')(() => ({
    padding: '0 10px',
    borderRadius: 8,
    width: '100%',
    userSelect: 'none',
}));

const PlaceHolderAndIcon = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px',
    width: '100%',
}));

const SearchBar = () => {
    const dir = i18next.dir(i18next.language);

    return (
        <Box>
            <SearchBox dir={dir}>
                <PlaceHolderAndIcon>
                    <IconButton>
                        <SearchIcon sx={{ color: '#5f6368' }} />
                    </IconButton>
                    {/* TODO: */}
                    <Search>
                        <InputBase sx={{ width: '100%' }} placeholder={`${i18next.t('search.Search')}`} />
                    </Search>
                </PlaceHolderAndIcon>
            </SearchBox>
        </Box>
    );
};

export default SearchBar;
