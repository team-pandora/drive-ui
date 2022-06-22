import { Box, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filesActions } from '../../../store/files';
import MainButton from './MainButton';
import PageButtons from './PageButtons';
import Storage from './Storage';

const SBox = styled(Box)({
    width: '250px',
    height: '850px',
    minWidth: '250px',
});

const Sidebar = () => {
    const dispatch = useDispatch();

    const ResetFileSelection = () => {
        dispatch(filesActions.setSelected([]));
    };

    return (
        <SBox onClick={ResetFileSelection}>
            <MainButton />
            <PageButtons />
            {/* TODO: api request of user's quota */}
            <Storage used={4.64} limit={10} />
        </SBox>
    );
};

export default Sidebar;
