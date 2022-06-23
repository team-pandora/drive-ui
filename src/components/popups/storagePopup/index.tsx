import styled from '@emotion/styled';
import { Box } from '@mui/material';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import StorageBody from './StorageBody';
import StorageFooter from './StorageFooter';
import StorageHeader from './StorageHeader';

const SBox = styled(Box)({
    height: '250px',
    width: '500px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    userSelect: 'none',
    justifyContent: 'space-evenly',
    padding: '0 15px',
});

const InfoDialog = () => {
    const dir = i18next.dir(i18next.language);

    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.storage;

    const handleClose = () => {
        dispatch(popupActions.setStorage());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <SBox>
                <StorageHeader />
                <StorageBody />
                <StorageFooter />
            </SBox>
        </GenericDialog>
    );
};

export default InfoDialog;
