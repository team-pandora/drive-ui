import { Box, Button, styled } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';

const SBox = styled(Box)({
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

const NavigationFooter: React.FC = () => {
    const dir = i18next.dir(i18next.language);

    const dispatch = useDispatch();

    const handleSubmission = () => {
        dispatch(popupActions.setStorage());
    };

    const handleCancel = () => {
        dispatch(popupActions.setStorage());
    };

    return (
        <SBox dir={dir}>
            <Box
                dir={dir}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    variant="text"
                    onClick={handleSubmission}
                    sx={{ margin: '0px 1%', textTransform: 'none' }}
                >{`${i18next.t('buttons.Cancel')}`}</Button>
                <Button
                    variant="contained"
                    onClick={handleCancel}
                    sx={{ margin: '0px 1%', textTransform: 'none' }}
                >{`${i18next.t('buttons.Submit')}`}</Button>
            </Box>
        </SBox>
    );
};

export default NavigationFooter;
