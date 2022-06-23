import { Box, Button, styled, TextField, FormHelperText } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RenameFile } from '../../../api/files';
import { popupActions } from '../../../store/popups';

const SBox = styled(Box)({
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
});

const StorageBody = () => {
    const dir = i18next.dir(i18next.language);

    const dispatch = useDispatch();
    const textRef = useRef<HTMLInputElement>(null);
    const [textLength, setTextLength] = useState<Number>(0);

    const handleChange = (event: any) => {
        setTextLength(event.target.value.length);
    };

    useEffect(() => {
        if (textRef.current) {
            textRef.current.select();
        }
    }, [textRef]);

    return (
        <TextField
            dir={dir}
            multiline
            rows={4}
            variant="standard"
            inputRef={textRef}
            inputProps={{ maxLength: 200 }}
            onChange={handleChange}
            helperText={`${textLength}/200`}
            label={`${i18next.t('messages.RequestStorageLabel')}`}
            sx={{
                '& .MuiFormLabel-root': {
                    left: 'auto',
                },
                '& .MuiFormHelperText-root': {
                    textAlign: dir === 'ltr' ? 'left' : 'right',
                },
            }}
        ></TextField>
    );
};

export default StorageBody;
