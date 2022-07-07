import { AppBar, Box, styled, Toolbar } from '@mui/material';
import title from '../../../assets/drive-logo.svg';
import logo from '../../../assets/logo.svg';
import SearchBar from './Search';
import ToolBarIcons from './ToolBarIcons';

const SToolbar = styled(Toolbar)({
    backgroundColor: 'white',
});

const Logo = styled('img')({
    height: '48px',
    width: '48px',
});

const Title = styled('img')({
    height: '48px',
    width: '130px',
    margin: 'auto',
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
        <SAppBar>
            <SToolbar>
                <SLogoBox>
                    <Logo src={logo} alt="drive logo" />
                    <Title src={title} alt="drive logo" />
                </SLogoBox>
                <SearchBar />
                <Box sx={{ width: '100%' }}></Box>
                <ToolBarIcons />
            </SToolbar>
        </SAppBar>
    );
};

export default TopBar;
