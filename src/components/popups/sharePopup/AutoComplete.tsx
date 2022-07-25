import { Autocomplete, Avatar, Box, Grid, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import i18next from 'i18next';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getSharedUsers as searchUsers } from '../../../api/users';
import { usersActions } from '../../../store/users';

const AutoCompleteStyle = {
    width: '600px',
    '.MuiAutocomplete-tag': {
        direction: 'ltr',
    },
    display: 'flex',
    alignItems: 'center',
    '.MuiFilledInput-root': {
        padding: '0px',
        paddingLeft: '10px',
    },
    '.MuiFilledInput-input': {
        height: '41px',
    },
};

const SearchAutoComplete = () => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const [searchedUsers, setSearchedUsers] = useState([]);

    const { mutateAsync } = useMutation((query: string) => searchUsers(query), {
        onSuccess: (data: any) => {
            setSearchedUsers(data);
        },
        onError: (error: any) => {
            toast.error('Failed searching files');
        },
    });

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        mutateAsync(event.target.value);
    };

    return (
        <Autocomplete
            sx={AutoCompleteStyle}
            multiple
            id="multiple-limit-tags"
            options={searchedUsers.map((user: any) => user)}
            freeSolo
            onChange={(event: any, user: any) => {
                dispatch(usersActions.setSelectedUsers(user));
            }}
            renderOption={(props, options, { selected }) => {
                return (
                    <li {...props}>
                        <Box dir={dir} sx={{ flexGrow: 1 }}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Avatar
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="body2">{options.fullName}</Typography>
                                    <span color="lightgrey">{options.hierarchy}</span>
                                </Grid>
                            </Grid>
                        </Box>
                    </li>
                );
            }}
            renderTags={(selectedTags: any[], getTagProps) => {
                dispatch(usersActions.setUsers(selectedTags));
                return selectedTags.map((option: any, index: number) => {
                    return <Chip variant="outlined" label={option.fullName} {...getTagProps({ index })} />;
                });
            }}
            getOptionLabel={(option) => option.fullName}
            renderInput={(params) => (
                <TextField
                    onChange={handleChange}
                    {...params}
                    variant="filled"
                    placeholder={i18next.t('search.SearchUsers')}
                />
            )}
        />
    );
};

export default SearchAutoComplete;
