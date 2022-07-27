import { Dialog } from '@mui/material';
import i18next from 'i18next';
import { useSelector } from 'react-redux';

export const GenericDialog = (props: any) => {
    const dir = i18next.dir(i18next.language);

    const { selectorFunction } = props;
    const show: boolean = useSelector(selectorFunction);

    return (
        <Dialog
            dir={dir}
            open={show}
            onClose={props.onClose}
            BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.435)' } }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    minWidth: '400px',
                    maxWidth: '650px',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    overflow: 'hidden',
                },
                elevation: 0,
            }}
        >
            {props.children}
        </Dialog>
    );
};
