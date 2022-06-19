import { ArrowDropDown, ArrowLeft, ArrowRight } from '@mui/icons-material';
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
    icon: JSX.Element;
    isOpen: boolean;
    onArrowClick: () => void;
};

const ExternalButton: React.FC<props> = ({ path, label, icon, isOpen, onArrowClick }) => {
    const dir = i18next.dir(i18next.language) === 'rtl' ? '25px 0 0 25px' : '0 25px 25px 0';
    const ActiveListItem = styled(ListItem)({
        backgroundColor: '#e8f0fe',
        borderRadius: dir,
    });

    // TODO:
    // eslint-disable-next-line no-nested-ternary
    const ArrowIcon = isOpen ? ArrowDropDown : i18next.dir(i18next.language) === 'rtl' ? ArrowLeft : ArrowRight;
    const location = useLocation();
    const isActive = location.pathname === `/${path}`;
    const ListItemComponent = isActive ? ActiveListItem : ListItem;
    const TypographyComponent = isActive ? ActiveTypography : Typography;

    return (
        <NavLinkStyle activeStyle={{ color: '#1967d2' }} to={path}>
            <ListItemComponent
                sx={{
                    marginTop: '5px',
                }}
                disablePadding
            >
                <ListItemButton
                    sx={{
                        borderRadius: dir,
                    }}
                >
                    <ListItemIcon sx={{ minWidth: '36px', marginX: '10px' }}>
                        <ArrowIcon
                            onClick={onArrowClick}
                            sx={{
                                marginX: '-25px',
                                position: 'absolute',
                                color: '#5f6368',
                            }}
                        />
                        {icon}
                    </ListItemIcon>
                    <TypographyComponent>{label}</TypographyComponent>
                </ListItemButton>
            </ListItemComponent>
        </NavLinkStyle>
    );
};

export default ExternalButton;
