import { SettingsOutlined } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Flags from 'country-flag-icons/react/3x2';
import i18next from 'i18next';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

const UserSettings = () => {
    const dispatch = useDispatch();
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
        setShowSettingsMenu(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowSettingsMenu(true);
    };

    const selectEnglish = () => {
        i18next.changeLanguage('en');
    };

    const selectHebrew = () => {
        i18next.changeLanguage('he');
    };

    return (
        <Fragment>
            <IconButton onClick={handleClick}>
                <SettingsOutlined />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="settings-menu"
                open={showSettingsMenu}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={selectEnglish}>
                    <ListItemIcon>
                        <Flags.US width={30} title="United States" />
                    </ListItemIcon>
                    <ListItemText>English</ListItemText>
                </MenuItem>

                <MenuItem onClick={selectHebrew}>
                    <ListItemIcon>
                        <Flags.IL width={30} title="Israel" />
                    </ListItemIcon>
                    <ListItemText>Hebrew</ListItemText>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default UserSettings;
