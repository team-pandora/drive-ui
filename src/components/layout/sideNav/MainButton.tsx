import { Add } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../../store/global';
import MainMenu from '../mainMenu/MainMenu';

const SBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    height: '70px',
}));

const SButton = styled(Button)({
    width: '140px',
    height: '45px',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: '24px',
    textTransform: 'none',
    ':hover': { backgroundColor: 'rgba(0,0,0,.04)' },
    display: 'flex',
    justifyContent: 'space-between',
});

const MainButton = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const showMenu = useSelector((state: any) => state.global.mainMenuIsVisible);
    const dir = i18next.dir(i18next.language);
    const marginSide = dir === 'rtl' ? 'marginRight' : 'marginLeft';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(globalActions.toggleMainMenu());
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        dispatch(globalActions.toggleMainMenu());
        setAnchorEl(null);
    };

    return (
        <SBox>
            <SButton sx={{ [marginSide]: '20px' }} onClick={handleClick} variant="contained" size="large">
                {`${i18next.t('buttons.New')}`}
                <Add sx={{ color: '#f77f00', fontSize: 35 }} />
            </SButton>
            <MainMenu anchorEl={anchorEl} showMenu={showMenu} handleClose={handleClose} />
        </SBox>
    );
};

export default MainButton;
