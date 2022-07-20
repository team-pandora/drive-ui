import { AppBar, Box, styled, Toolbar } from '@mui/material';
import Logo from '../../../assets/NewLogo.svg';
import title from '../../../assets/drive-logo.svg';
import SearchBar from './Search';
import ToolBarIcons from './ToolBarIcons';

const SToolbar = styled(Toolbar)({
    backgroundColor: 'white',
});

const SLogo = styled('img')({
    height: '75px',
    width: '75px',
    userSelect: 'none',
});

const Title = styled('img')({
    height: '48px',
    width: '130px',
    margin: 'auto',
    userSelect: 'none',
});

const SLogoBox = styled(Box)({
    minWidth: '243px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const SAppBar = styled(AppBar)({
    boxShadow: 'none',
    borderBottom: 'solid 1px lightgray',
    position: 'sticky',
});

const TopBar = () => {
    return (
        <SAppBar onDragStart={(event) => event.preventDefault()}>
            <SToolbar>
                <SLogoBox>
                    <SLogo src={Logo} alt="drive-logo" onDragStart={(event) => event.preventDefault()} />
                    <Box width="100%" height="100%">
                        <Title src={title} alt="drive logo" onDragStart={(event) => event.preventDefault()} />
                    </Box>
                </SLogoBox>
                <SearchBar />
                <Box sx={{ width: '100%' }}></Box>
                <ToolBarIcons />
            </SToolbar>
        </SAppBar>
    );
};

export default TopBar;
