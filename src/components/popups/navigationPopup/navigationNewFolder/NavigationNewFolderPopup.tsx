import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Avatar, Box, Button, styled, TextField, Typography } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFolder } from '../../../../api/files';
import { popupActions } from '../../../../store/popups';

const NewFolder = styled(Box)({
    width: '100%',
    height: '200px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    userSelect: 'none',
});

const NewFolderBody = styled(Box)({
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 15px',
});

type props = {
    parent: string | null | undefined;
    fetchFunc: any;
};

const NewFolderPopup: React.FC<props> = ({ parent, fetchFunc }) => {
    const dir = i18next.dir(i18next.language);

    const [value, setValue] = useState(`${i18next.t('placeholders.UntitledFolder')}`);
    const dispatch = useDispatch();

    const textRef = useRef<HTMLInputElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onNewFolderSubmit = async () => {
        await createFolder(value, parent);
        await fetchFunc();
        dispatch(popupActions.setNavigationNewFolder());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onNewFolderSubmit();
        }
    };

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(popupActions.setNavigationNewFolder());
    };

    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
            textRef.current.select();
        }
    }, [textRef]);

    return (
        <NewFolder>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 15px',
                    direction: dir,
                }}
            >
                <Avatar sx={{ backgroundColor: '#4285f4', width: '32px', height: '32px' }}>
                    <CreateNewFolderIcon />
                </Avatar>
                <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>{`${i18next.t(
                    'messages.NewFolder',
                )}`}</Typography>
            </Box>
            <NewFolderBody>
                <TextField
                    id="outlined-multiline-flexible"
                    maxRows={1}
                    value={value}
                    onChange={handleChange}
                    inputRef={textRef}
                    size="small"
                    sx={{
                        width: '460px',
                    }}
                    onKeyDown={handleKeyDown}
                />
                <Box
                    sx={{
                        display: 'flex',
                        margin: '0 10px',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant="text"
                        sx={{ margin: '0px 1%', textTransform: 'none' }}
                        onClick={onCancel}
                    >{`${i18next.t('buttons.Cancel')}`}</Button>
                    <Button
                        onClick={onNewFolderSubmit}
                        variant="contained"
                        disabled={value === ''}
                        sx={{ margin: '0px 1%', textTransform: 'none' }}
                    >{`${i18next.t('buttons.CreateFolder')}`}</Button>
                </Box>
            </NewFolderBody>
        </NewFolder>
    );
};

NewFolderPopup.defaultProps = {};
export default NewFolderPopup;
