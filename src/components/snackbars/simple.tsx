import CloseIcon from '@mui/icons-material/Close';
import { SnackbarContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import i18next from 'i18next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsActions } from '../../store/notifications';

const SimpleSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const open = useSelector((state: any) => state.notifications.open);
    const content = useSelector((state: any) => state.notifications.content);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(notificationsActions.setOpen());
    };

    const action = (
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
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'bottom', horizontal: dir === 'rtl' ? 'left' : 'right' }}
                onClose={handleClose}
            >
                <SnackbarContent
                    message={content}
                    sx={{
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between',
                        '& .MuiSnackbarContent-action': {
                            marginLeft: 0,
                            paddingLeft: 0,
                        },
                    }}
                    action={action}
                />
            </Snackbar>
        </div>
    );
};

export default SimpleSnackbar;
