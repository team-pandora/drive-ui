import { Box, List, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        setSelectedIndex(index);
    };

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
                        My Drive
                    </NavigationListItem>
                    <NavigationListItem
                        index={1}
                        onClick={(event: React.MouseEvent) => handleListItemClick(event, 1)}
                        selectedIndex={selectedIndex}
                        iconType={'shared'}
                        setParent={setParent}
                        id={'shared'}
                    >
                        Shared with me
                    </NavigationListItem>
                </List>
            </NavigationBodyBox>
        </>
    );
};

export default NavigationRootBody;
