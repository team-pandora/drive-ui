import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getQuota } from '../../../api/files';
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
    const [used, setUsed] = useState<string | null>(null);
    const [limit, setLimit] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuota();
            setUsed(Number(data.used / 1000 / 1000 / 1000).toFixed(2));
            setLimit(Math.floor(data.limit / 1000 / 1000 / 1000).toFixed(0));
        };
        fetchData();
    }, []);

    return (
        <SBox onClick={ResetFileSelection}>
            <MainButton />
            <PageButtons />
            {used && limit && <Storage used={used} limit={limit} />}
        </SBox>
    );
};

export default Sidebar;
