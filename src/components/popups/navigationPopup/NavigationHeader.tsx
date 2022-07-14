import CloseIcon from '@mui/icons-material/Close';
import { Box, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getFile } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import { NavigationRootHeader } from './root/NavigationRootHeader';

const HeaderContent = styled(Box)({
    margin: '14px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
});

type props = {
    parent: string | undefined | null;
    setParent: any;
};

const NavigationHeader: React.FC<props> = ({ parent, setParent }) => {
    if (parent === undefined) return <NavigationRootHeader></NavigationRootHeader>;

    const [parentName, setParentName] = useState<string>();

    const dispatch = useDispatch();

    const fetchData = async () => {
        if (parent === null) setParentName('My Drive');
        else {
            setParentName((await getFile(parent)).name);
        }
    };

    useEffect(() => {
        fetchData();
    }, [parent]);

    const handleNavigationClose = () => {
        setParent(undefined);
        dispatch(popupActions.setNavigation());
    };

    const handleBack = async () => {
        if (parent === null) setParent(undefined);
        if (parent === 'shared') {
            setParent(undefined);
        } else {
            setParent((await getFile(parent!)).parent);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: '#f1f1f1',
                height: '60px',
            }}
        >
            <HeaderContent>
                <ArrowBackIosIcon
                    sx={{ alignSelf: 'center', color: '#757575', cursor: 'pointer' }}
                    onClick={handleBack}
                />
                <Typography
                    sx={{
                        fontSize: '16px',
                        color: '#777',
                        width: '250px',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        userSelect: 'none',
                        marginRight: 'auto',
                    }}
                >
                    {parentName}
                </Typography>
                <CloseIcon onClick={handleNavigationClose} sx={{ cursor: 'pointer', color: 'gray' }} />
            </HeaderContent>
        </Box>
    );
};

export default NavigationHeader;
