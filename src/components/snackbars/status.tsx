import styled from '@emotion/styled';
import { SnackbarContent } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsActions } from '../../store/notifications';

const SContent = styled(SnackbarContent)({
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiSnackbarContent-action': {
        marginLeft: 0,
        paddingLeft: 0,
    },
});

const StatusSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const open = useSelector((state: any) => state.notifications.uploadOpen);
    const files = useSelector((state: any) => state.files.uploaded);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(notificationsActions.setUploadOpen());
    };

    useEffect(() => {}, [files]);

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'bottom', horizontal: dir === 'rtl' ? 'left' : 'right' }}
                onClose={handleClose}
            >
                <SContent message="adfasf" />
            </Snackbar>
        </div>
    );
};

export default StatusSnackbar;
