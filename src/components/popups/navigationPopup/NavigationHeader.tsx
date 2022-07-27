import CloseIcon from '@mui/icons-material/Close';
import { Box, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import i18next from 'i18next';
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
    const dir = i18next.dir(i18next.language);
    const headerMargin = dir === 'ltr' ? '0 auto 0 0' : '0 0 0 auto';

    const DirectedArrowForward = styled(ArrowBackIosIcon)({
        transform: dir === 'ltr' ? undefined : 'scaleX(-1)',
    });

    if (parent === undefined) return <NavigationRootHeader></NavigationRootHeader>;

    const [parentName, setParentName] = useState<string>();

    const dispatch = useDispatch();

    const fetchData = async () => {
        if (parent === 'shared') setParentName(i18next.t('titles.SharedWithMe'));
        else if (parent === null) setParentName(i18next.t('titles.MyDrive'));
        else setParentName((await getFile(parent)).name);
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
                dir,
            }}
        >
            <HeaderContent sx={{ dir }}>
                <DirectedArrowForward
                    sx={{ alignSelf: 'center', color: '#757575', cursor: 'pointer', dir }}
                    onClick={handleBack}
                />
                <Typography
                    sx={{
                        dir,
                        fontSize: '16px',
                        color: '#777',
                        width: '250px',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        userSelect: 'none',
                        margin: headerMargin,
                    }}
                >
                    {parentName}
                </Typography>
                <CloseIcon onClick={handleNavigationClose} sx={{ cursor: 'pointer', color: 'gray', dir }} />
            </HeaderContent>
        </Box>
    );
};

export default NavigationHeader;
