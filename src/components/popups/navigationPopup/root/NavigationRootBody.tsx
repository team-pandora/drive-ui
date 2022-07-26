import { Box, List, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { NavigationListItem } from '../NavigationListItem';

const NavigationBodyBox = styled(Box)({
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiListItem-root': {
        paddingRight: '11px',
    },
});

type props = {
    setParent: any;
};

const NavigationRootBody: React.FC<props> = ({ setParent }) => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        setSelectedIndex(index);
    };

    const handleNavigationKeyDown = (event: any, parent?: string) => {
        let newIndex;
        switch (event.key) {
            case 'ArrowUp':
                newIndex = (selectedIndex - 1) % 2;
                setSelectedIndex(newIndex >= 0 ? newIndex : newIndex + 2);
                break;
            case 'ArrowDown':
                newIndex = (selectedIndex + 1) % 2;
                setSelectedIndex(newIndex >= 0 ? newIndex : newIndex + 2);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleNavigationKeyDown);

        return () => {
            window.removeEventListener('keydown', handleNavigationKeyDown);
        };
    }, [handleNavigationKeyDown]);

    return (
        <>
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
                        dir,
                    }}
                >
                    <NavigationListItem
                        index={0}
                        onClick={(event: React.MouseEvent) => handleListItemClick(event, 0)}
                        selectedIndex={selectedIndex}
                        iconType={'home'}
                        setParent={setParent}
                        id={null}
                    >
                        {i18next.t('titles.MyDrive')}
                    </NavigationListItem>
                    <NavigationListItem
                        index={1}
                        onClick={(event: React.MouseEvent) => handleListItemClick(event, 1)}
                        selectedIndex={selectedIndex}
                        iconType={'shared'}
                        setParent={setParent}
                        id={'shared'}
                    >
                        {i18next.t('titles.SharedWithMe')}
                    </NavigationListItem>
                </List>
            </NavigationBodyBox>
        </>
    );
};

export default NavigationRootBody;
