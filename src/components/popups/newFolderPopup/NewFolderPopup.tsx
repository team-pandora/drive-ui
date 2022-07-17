import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Avatar, Box, Button, styled, TextField, Typography } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFolder } from '../../../api/files';
import { filesActions } from '../../../store/files';
import { notificationsActions } from '../../../store/notifications';
import { popupActions } from '../../../store/popups';
import { selectGetFilesFunc } from '../../../utils/files';

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

const NewFolderPopup: React.FC = () => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const history = useHistory();

    const [value, setValue] = useState('Untitled folder');
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const params = window.location.pathname.slice(1).split('/');
    const parentFolder: string | null = params[0] === 'folder' ? params[1] : null;
    const textRef = useRef<HTMLInputElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onNewFolderSubmit = async () => {
        try {
            await createFolder(value, parentFolder);

            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FileDeletedSuccessfully')}`
                    : `${i18next.t('messages.FilesDeletedSuccessfully')}`;

            if (!parentFolder) history.push(`/my-drive`);
            dispatch(filesActions.setFiles(await selectGetFilesFunc()(parentFolder || 'null')));
            dispatch(notificationsActions.setContent(message));
            dispatch(notificationsActions.setSimpleOpen());
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedDeletingFile')}`
                    : `${i18next.t('messages.FailedDeletingFiles')}`;
            toast.error(message);
        } finally {
            dispatch(popupActions.setNewFolder());
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onNewFolderSubmit();
        }
    };

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(popupActions.setNewFolder());
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
                <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                    {`${i18next.t('messages.NewFolder')}`}
                </Typography>
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
