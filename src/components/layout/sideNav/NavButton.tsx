import { ListItem, ListItemButton, ListItemIcon, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { NavLink, useLocation } from 'react-router-dom';

const NavLinkStyle = styled(NavLink)({
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '25px 0 0 25px',
});

type props = {
    path: string;
    label: string;
    children: React.ReactNode;
};

const NavButton: React.FC<props> = ({ path, label, children }) => {
    const dir = i18next.dir(i18next.language) === 'rtl' ? '25px 0 0 25px' : '0 25px 25px 0';

    const location = useLocation();
    const isActive = location.pathname === `/${path}`;

    const SListItem = styled(ListItem)({
        backgroundColor: isActive ? '#e8f0fe' : 'inherit',
        borderRadius: i18next.dir(i18next.language) === 'rtl' ? '25px 0 0 25px' : '0 25px 25px 0',
    });

    const STypography = styled(Typography)({
        fontWeight: isActive ? 'bold' : 'normal',
    });

    const iconButtonStyle = {
        backgroundColor: `${children === null ? '#f4f2ed' : 'none'}`,
        borderRadius: `${dir}`,
    };

    return (
        <NavLinkStyle activeStyle={{ color: '#1967d2' }} to={path}>
            <SListItem sx={{ marginTop: '5px' }} disablePadding>
                <ListItemButton sx={iconButtonStyle}>
                    <ListItemIcon sx={{ minWidth: '36px', marginX: '10px', color: `${isActive ? '#1967D2' : 'none'}` }}>
                        {children}
                    </ListItemIcon>
                    <STypography>{label}</STypography>
                </ListItemButton>
            </SListItem>
        </NavLinkStyle>
    );
};

export default NavButton;
