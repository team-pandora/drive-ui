import { ArrowDropDown, ArrowLeft, ArrowRight } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { NavLink } from 'react-router-dom';

const NavLinkStyle = styled(NavLink)({
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '25px 0 0 25px',
});

type props = {
    path: string;
    label: string;
    icon: JSX.Element;
    isOpen: boolean;
    onArrowClick: () => void;
};

const IncomingFilesButton: React.FC<props> = ({ path, label, icon, isOpen, onArrowClick }) => {
    const dir = i18next.dir(i18next.language) === 'rtl' ? '25px 0 0 25px' : '0 25px 25px 0';

    // TODO:
    const ArrowIcon = isOpen ? ArrowDropDown : i18next.dir(i18next.language) === 'rtl' ? ArrowLeft : ArrowRight;

    const handleClick = (event: any) => {
        event.preventDefault();
        onArrowClick();
    };

    return (
        <NavLinkStyle activeStyle={{ color: '#1967d2' }} onClick={handleClick} to={path}>
            <ListItem
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
                    <Typography>{label}</Typography>
                </ListItemButton>
            </ListItem>
        </NavLinkStyle>
    );
};

export default IncomingFilesButton;
