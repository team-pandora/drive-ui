import { AppBar, Box, styled, Toolbar } from '@mui/material';
import logoSvg from '../../../assets/logoText.svg';
import SearchBar from './Search';
import ToolBarIcons from './ToolBarIcons';

const SToolbar = styled(Toolbar)({
    backgroundColor: 'white',
});

const Logo = styled('img')({
    height: '48px',
    width: '130px',
    paddingRight: '100px',
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
                <Logo src={logoSvg} alt="drive logo" />
                <SearchBar />
                <Box sx={{ width: '100%' }}></Box>
                <ToolBarIcons />
            </SToolbar>
        </SAppBar>
    );
};

export default TopBar;
