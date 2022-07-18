import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FolderIcon from '@mui/icons-material/Folder';
import StarIcon from '@mui/icons-material/Star';
import { ListItem, ListItemIcon, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';

type props = {
    index: number;
    selectedIndex: number;
    iconType: string;
    onClick: any;
    setParent: any;
    children: string;
    id: string | undefined | null;
};

export const NavigationListItem: React.FC<props> = ({
    index,
    selectedIndex,
    iconType,
    onClick,
    children,
    setParent,
    id,
}) => {
    const isSelected = index === selectedIndex;
    const selectedColor = isSelected ? 'white' : '#757575';
    const dispatch = useDispatch();

    let Icon: any;
    switch (iconType) {
        case 'home':
            Icon = <HomeIcon sx={{ color: selectedColor }} />;
            break;
        case 'shared':
            Icon = <PeopleAltIcon sx={{ color: selectedColor }} />;
            break;
        case 'folder':
            Icon = <FolderIcon sx={{ color: selectedColor }} />;
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
            onClick={onClick}
            onDoubleClick={() => {
                setParent(id);
            }}
        >
            <ListItemIcon>{Icon}</ListItemIcon>
            <Typography sx={{ marginLeft: '10px', userSelect: 'none', color: selectedColor, fontWeight: '500' }}>
                {children}
            </Typography>
            <ArrowForwardIosIcon
                sx={{ cursor: 'pointer', marginLeft: 'auto', color: selectedColor }}
                onClick={() => {
                    setParent(id);
                }}
            />
        </ListItem>
    );
};
