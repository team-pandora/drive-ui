import { Box, Button, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../../../store/popups';

const SBox = styled(Box)({
    width: '100%',
    height: '200px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
});

const BodyBox = styled(Box)({
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 15px',
});

const RemoveBody: React.FC = () => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const onSubmit = async () => {
        dispatch(popupActions.setRemove());
    };

    const onCancel = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(popupActions.setRemove());
    };

    const content =
        selectedFiles.length > 1
            ? `${i18next.t('messages.DeleteMsgMultiple', { count: selectedFiles.length })}`
            : `${i18next.t('messages.DeleteMsgSingle', { name: selectedFiles[0] })}`;

    return (
        <SBox>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 15px',
                    direction: dir,
                }}
            >
                <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                    {`${i18next.t('messages.DeletePermanently')}`}
                </Typography>
            </Box>
            <BodyBox>
                <Box sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', height: '100px' }}>
                    <Box sx={{ direction: dir }}>
                        <Typography sx={{ fontSize: '16px', mr: '10px' }}>{content}</Typography>
                    </Box>
                    <Box sx={{ direction: dir, display: 'flex', flexFlow: 'row', justifyContent: 'flex-end' }}>
                        <Button
                            variant="text"
                            sx={{ margin: '0px 1%', textTransform: 'none' }}
                            onClick={onCancel}
                        >{`${i18next.t('buttons.Cancel')}`}</Button>
                        <Button
                            onClick={onSubmit}
                            variant="contained"
                            sx={{ margin: '0px 1%', textTransform: 'none' }}
                        >{`${i18next.t('buttons.Delete')}`}</Button>
                    </Box>
                </Box>
            </BodyBox>
        </SBox>
    );
};

export default RemoveBody;
