import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FolderIcon from '@mui/icons-material/Folder';
import StarIcon from '@mui/icons-material/Star';
import { ListItem, ListItemIcon, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
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
    const dir = i18next.dir(i18next.language);
    const arrowForwardMargin = dir === 'ltr' ? '0 0 0 auto' : '0 auto 0 0';

    const isSelected = index === selectedIndex;
    const selectedColor = isSelected ? 'white' : '#757575';

    const DirectedArrowForward = styled(ArrowForwardIosIcon)({
        transform: dir === 'ltr' ? undefined : 'scaleX(-1)',
    });
    const dispatch = useDispatch();

    //

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
                    '& .MuiSvgIcon-root': {
                        color: selectedColor,
                    },
                },
            }}
            selected={isSelected}
            onClick={onClick}
            onDoubleClick={() => {
                setParent(id);
            }}
        >
            <ListItemIcon>{Icon}</ListItemIcon>
            <Typography sx={{ margin: '0 10px', userSelect: 'none', color: selectedColor, fontWeight: '500' }}>
                {children}
            </Typography>
            <DirectedArrowForward
                sx={{ cursor: 'pointer', margin: arrowForwardMargin, color: 'white' }}
                onClick={() => {
                    setParent(id);
                }}
            />
        </ListItem>
    );
};
