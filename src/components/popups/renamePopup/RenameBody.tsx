import { Box, Button, styled, TextField } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getFiles, RenameFile } from '../../../api/files';
import { filesActions } from '../../../store/files';
import { notificationsActions } from '../../../store/notifications';
import { popupActions } from '../../../store/popups';

const RenameBodyBox = styled(Box)({
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 15px',
});

const RenameBody = () => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const [value, setValue] = useState(selectedFiles[0].name);
    const textRef = useRef<HTMLInputElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const queryClient = useQueryClient();

    const onRenameSubmit = async () => {
        try {
            await RenameFile(selectedFiles[0], textRef.current!.value);
            dispatch(filesActions.setFiles(await getFiles(selectedFiles[0].parent)));
            dispatch(notificationsActions.setContent(`${i18next.t('messages.FileRenamedSuccessfully')}`));
            dispatch(notificationsActions.setSimpleOpen());
        } catch (error) {
            toast.error(`${i18next.t('messages.FailedRenamingFile')}`);
        } finally {
            dispatch(popupActions.setRename());
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onRenameSubmit();
        }
    };

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(popupActions.setRename());
    };

    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
            textRef.current.select();
        }
    }, [textRef]);

    return (
        <RenameBodyBox>
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
                dir={dir}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '0 10px',
                    justifyContent: 'flex-end',
                }}
                dir={dir}
            >
                <Button
                    variant="text"
                    sx={{ margin: '0px 1%', textTransform: 'none' }}
                    onClick={onCancel}
                >{`${i18next.t('buttons.Cancel')}`}</Button>
                <Button
                    onClick={onRenameSubmit}
                    variant="contained"
                    disabled={value === ''}
                    sx={{ margin: '0px 1%', textTransform: 'none' }}
                >{`${i18next.t('buttons.Finish')}`}</Button>
            </Box>
        </RenameBodyBox>
    );
};

export default RenameBody;
