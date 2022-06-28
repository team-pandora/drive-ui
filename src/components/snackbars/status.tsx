import styled from '@emotion/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, IconButton, List, SnackbarContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsActions } from '../../store/notifications';

const SContent = styled(SnackbarContent)({
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiSnackbarContent-action': {
        marginLeft: 0,
        paddingLeft: 0,
    },
});

const SHeader = styled(SnackbarContent)({
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiSnackbarContent-action': {
        marginLeft: 0,
        paddingLeft: 0,
    },
    backgroundColor: '#202124',
    color: 'white',
    height: '40px',
    fontSize: '18px',
});

const StatusSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const open = useSelector((state: any) => state.notifications.uploadOpen);
    const files = useSelector((state: any) => state.files.uploaded);
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('uploading');

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(notificationsActions.setUploadOpen());
    };

    useEffect(() => {
        if (files.length > 0) {
            setContent(files[0].name);
            setStatus(files[0].status);
        }
    }, [files]);

    const statusAction =
        status === 'uploading' ? (
            <CircularProgress size={20} sx={{ marginX: '5px' }} />
        ) : (
            <CheckCircleIcon sx={{ color: 'green' }} />
        );

    const closeAction = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={400000}
                anchorOrigin={{ vertical: 'bottom', horizontal: dir === 'rtl' ? 'left' : 'right' }}
                onClose={handleClose}
            >
                <List>
                    <SHeader message="Uploads" action={closeAction} />
                    <SContent
                        message={content}
                        action={statusAction}
                        dir="ltr"
                        sx={{ backgroundColor: 'white', color: '#222', borderRadius: '0 0 0 0' }}
                    />
                    <SContent
                        message={content}
                        action={statusAction}
                        dir="ltr"
                        sx={{ backgroundColor: 'white', color: '#222', borderRadius: '0 0 0 0' }}
                    />
                </List>
            </Snackbar>
        </div>
    );
};

export default StatusSnackbar;
