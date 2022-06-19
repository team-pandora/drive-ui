import { ListItem, ListItemButton, ListItemIcon, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { NavLink, useLocation } from 'react-router-dom';

const NavLinkStyle = styled(NavLink)({
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '25px 0 0 25px',
});

const ActiveTypography = styled(Typography)({
    fontWeight: 'bold',
});

type props = {
    path: string;
    label: string;
    children: React.ReactNode;
};

// TODO: pass icon as children instead of prop.
const NavButton: React.FC<props> = ({ path, label, children }) => {
    const dir = i18next.dir(i18next.language) === 'rtl' ? '25px 0 0 25px' : '0 25px 25px 0';
    const ActiveListItem = styled(ListItem)({
        backgroundColor: '#e8f0fe',
        borderRadius: i18next.dir(i18next.language) === 'rtl' ? '25px 0 0 25px' : '0 25px 25px 0',
    });

    const location = useLocation();
    const isActive = location.pathname === `/${path}`;
    const ListItemComponent = isActive ? ActiveListItem : ListItem;
    const TypographyComponent = isActive ? ActiveTypography : Typography;

    const iconButtonStyle = {
        backgroundColor: `${children === null ? '#f4f2ed' : 'none'}`,
        borderRadius: `${dir}`,
    };

    return (
        <NavLinkStyle activeStyle={{ color: '#1967d2' }} to={path}>
            <ListItemComponent sx={{ marginTop: '5px' }} disablePadding>
                <ListItemButton sx={iconButtonStyle}>
                    <ListItemIcon sx={{ minWidth: '36px', marginX: '10px' }}>{children}</ListItemIcon>
                    <TypographyComponent>{label}</TypographyComponent>
                </ListItemButton>
            </ListItemComponent>
        </NavLinkStyle>
    );
};

export default NavButton;
