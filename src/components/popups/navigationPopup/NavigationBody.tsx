import { Box, List, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFile } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import { NavigationListItem } from './NavigationListItem';
import NavigationRootBody from './root/NavigationRootBody';

const NavigationBodyBox = styled(Box)({
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiListItem-root': {
        paddingRight: '11px',
    },
    overflow: 'auto',
});

type props = {
    parent: string | undefined | null;
    setParent: any;
    files: any;
    fsObjectId: string;
};

const NavigationBody: React.FC<props> = ({ parent, setParent, files }) => {
    if (parent === undefined) return <NavigationRootBody setParent={setParent}></NavigationRootBody>;

    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        dispatch(popupActions.setNavigationSelectedFolder(files[index].fsObjectId));
        setSelectedIndex(index);
    };

    const handleNavigationKeyDown = (event: any) => {
        let newIndex;
        if (!event.repeat) {
            switch (event.key) {
                case 'ArrowUp':
                    newIndex = (selectedIndex - 1) % files.length;
                    newIndex = newIndex >= 0 ? newIndex : newIndex + files.length;
                    dispatch(popupActions.setNavigationSelectedFolder(files[newIndex].fsObjectId));
                    setSelectedIndex(newIndex);
                    break;
                case 'ArrowDown':
                    newIndex = (selectedIndex + 1) % files.length;
                    newIndex = newIndex >= 0 ? newIndex : newIndex + files.length;
                    dispatch(popupActions.setNavigationSelectedFolder(files[newIndex].fsObjectId));
                    setSelectedIndex(newIndex);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleNavigationKeyDown);

        return () => {
            window.removeEventListener('keydown', handleNavigationKeyDown);
        };
    }, [handleNavigationKeyDown]);

    const formattedFiles = files.map((file: any, index: number) => {
        return (
            <NavigationListItem
                index={index}
                onClick={(event: React.MouseEvent) => handleListItemClick(event, index)}
                selectedIndex={selectedIndex}
                iconType={'folder'}
                setParent={setParent}
                id={file.fsObjectId}
            >
                {file.name}
            </NavigationListItem>
        );
    });

    return (
        <NavigationBodyBox>
            <List
                sx={{
                    padding: '0',
                    '& .MuiListItem-root.Mui-selected': {
                        backgroundColor: '#4d90fe',
                    },
                    '& .MuiListItem-root.Mui-selected:hover': {
                        backgroundColor: '#4d90fe',
                    },
                }}
            >
                {formattedFiles}
            </List>
        </NavigationBodyBox>
    );
};

export default NavigationBody;
