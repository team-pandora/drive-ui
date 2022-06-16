import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StarIcon from '@mui/icons-material/Star';
import { ListItem, ListItemIcon, Typography } from '@mui/material';

const SelectedHomeIcon = styled(HomeIcon)({
    color: 'white',
});

const SelectedSharedIcon = styled(PeopleAltIcon)({
    color: 'white',
});

const SelectedStarredIcon = styled(StarIcon)({
    color: 'white',
});

const SelectedForwardIcon = styled(ArrowForwardIosIcon)({
    color: 'white',
});

const SelectedText = styled(Typography)({
    color: 'white',
    fontWeight: 'bold',
});

export const NavigationListItem = (props: any) => {
    const { index, selectedIndex } = props;
    const isSelected = index === selectedIndex;

    const ToggleableHomeIcon = isSelected ? SelectedHomeIcon : HomeIcon;
    const ToggleableSharedIcon = isSelected ? SelectedSharedIcon : PeopleAltIcon;
    const ToggleableStarredIcon = isSelected ? SelectedStarredIcon : StarIcon;
    const ToggleableForwardIcon = isSelected ? SelectedForwardIcon : ArrowForwardIosIcon;
    const ToggleableText = isSelected ? SelectedText : Typography;

    let Icon: any;
    switch (props.iconType) {
        case 'home':
            Icon = ToggleableHomeIcon;
            break;
        case 'shared':
            Icon = ToggleableSharedIcon;
            break;
        case 'starred':
            Icon = ToggleableStarredIcon;
            break;
        default:
            break;
    }

    return (
        <ListItem
            sx={{
                display: 'flex',
                cursor: 'default',
                '& .MuiListItemIcon-root': {
                    minWidth: '0',
                },
                '&:hover': {
                    backgroundColor: '#f8f4f4',
                },
            }}
            selected={isSelected}
            onClick={props.onClick}
        >
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ToggleableText sx={{ marginLeft: '10px', userSelect: 'none' }}>{props.children}</ToggleableText>
            <ToggleableForwardIcon sx={{ cursor: 'pointer', marginLeft: 'auto' }} />
        </ListItem>
    );
};
