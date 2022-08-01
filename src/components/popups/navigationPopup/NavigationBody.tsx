import { Box, List, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
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
        caretColor: 'transparent',
    },
    overflow: 'auto',
    caretColor: 'transparent',
});

type props = {
    parent: string | undefined | null;
    setParent: any;
    files: any;
    fsObjectIds: string[];
};

const NavigationBody: React.FC<props> = ({ parent, setParent, files, fsObjectIds }) => {
    const dir = i18next.dir(i18next.language);
    if (parent === undefined) return <NavigationRootBody setParent={setParent}></NavigationRootBody>;

    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(-1);

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

    useEffect(() => {
        if (files.length) dispatch(popupActions.setNavigationSelectedFolder(files[0].fsObjectId));
    }, [files]);

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
        <NavigationBodyBox dir={dir}>
            <List
                sx={{
                    padding: '0',
                    '& .MuiListItem-root.Mui-selected': {
                        backgroundColor: '#4d90fe',
                    },
                    '& .MuiListItem-root.Mui-selected:hover': {
                        backgroundColor: '#4d90fe',
                    },
                    caretColor: 'transparent',
                }}
            >
                {formattedFiles}
            </List>
        </NavigationBodyBox>
    );
};

export default NavigationBody;
