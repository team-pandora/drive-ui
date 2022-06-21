import { Box, styled } from '@mui/material';
import i18next from 'i18next';
import RenameBody from './RenameBody';
import RenameHeader from './RenameHeader';

const SBox = styled(Box)({
    width: '100%',
    height: '200px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    userSelect: 'none',
});

const RenamePopup = () => {
    return (
        <SBox>
            <RenameHeader />
            <RenameBody />
        </SBox>
    );
};

export default RenamePopup;
