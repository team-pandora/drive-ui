import { CloudQueue } from '@mui/icons-material';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import StoragePopup from '../../popups/storagePopup';
import NavButton from './NavButton';

const SBox = styled(Box)({
    height: '130px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

const QuotaFillBox = styled(Box)({
    height: '4px',
    backgroundColor: '#1a73e8',
    borderRadius: '2px',
});

const QuotaOutlineBox = styled(Box)({
    width: '180px',
    height: '4px',
    backgroundColor: '#E8E8E8',
    borderRadius: '2px',
    margin: '0 auto',
});

const IncreaseQuotaButton = styled(Button)({
    border: '1px solid lightgray',
    width: '63%',
    color: '#1967d2',
    textTransform: 'none',
});

type props = {
    used: number;
    limit: number;
};

const Storage: React.FC<props> = ({ used, limit }) => {
    const quotaUsed = Math.round((100 * used) / limit);

    console.log(quotaUsed);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(popupActions.setStorage());
    };

    return (
        <>
            <SBox>
                <NavButton path="storage" label={i18next.t('sideBar.Storage')}>
                    <CloudQueue />
                </NavButton>
                <Stack alignItems={'center'} spacing={1} onClick={handleClick}>
                    <QuotaOutlineBox>
                        <QuotaFillBox sx={{ width: `${quotaUsed}%` }} />
                    </QuotaOutlineBox>
                    <Typography variant="caption" color={'#5f6368'}>
                        {`${i18next.t('messages.Quota', { used, limit })}`}
                    </Typography>
                    <IncreaseQuotaButton>{`${i18next.t('buttons.Increase')}`}</IncreaseQuotaButton>
                </Stack>
            </SBox>
            <StoragePopup />
        </>
    );
};

export default Storage;
