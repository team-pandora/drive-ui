import styled from '@emotion/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { CircularProgress, Divider, Icon, IconButton, List, SnackbarContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import i18next from 'i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsActions } from '../../store/notifications';

const SContent = styled(SnackbarContent)({
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiSnackbarContent-action': {
        marginLeft: 0,
        paddingLeft: 0,
    },
    boxShadow: 'none',
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

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(notificationsActions.setUploadOpen());
    };

    const statusAction = (fileStatus: string) => {
        switch (fileStatus) {
            case 'uploading':
                return <CircularProgress size={20} sx={{ marginX: '5px' }} />;
            case 'done':
                return <CheckCircleIcon sx={{ color: 'green' }} />;
            case 'failed':
                return <ErrorIcon sx={{ color: 'red' }} />;
            default:
                return null;
        }
    };

    const closeAction = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const content = files.map((file: any) => {
        return (
            <>
                <SContent
                    message={
                        (
                            <Icon>
                                <InsertDriveFileIcon />
                            </Icon>
                        ) + file.name
                    }
                    action={statusAction(file.status)}
                    dir={dir}
                    sx={{ backgroundColor: 'white', color: '#222', borderRadius: '0 0 0 0' }}
                />
                <Divider />
            </>
        );
    });

    return (
        <div>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'bottom', horizontal: dir === 'rtl' ? 'left' : 'right' }}
                onClose={handleClose}
            >
                <List sx={{ boxShadow: '0 2px 8px 0 rgb(0 0 0 / 20%)', padding: '0px' }}>
                    <SHeader message="Uploads" action={closeAction} />
                    {content}
                </List>
            </Snackbar>
        </div>
    );
};

export default StatusSnackbar;
