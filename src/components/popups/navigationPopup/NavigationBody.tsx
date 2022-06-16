import { Box, List, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationListItem } from './NavigationListItem';

const NavigationBodyBox = styled(Box)({
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiListItem-root': {
        paddingRight: '11px',
    },
});

const NavigationBody = () => {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        console.log(index);
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
                    >
                        My Drive
                    </NavigationListItem>
                    <NavigationListItem
                        index={1}
                        onClick={(event: React.MouseEvent) => handleListItemClick(event, 1)}
                        selectedIndex={selectedIndex}
                        iconType={'shared'}
                    >
                        Shared with me
                    </NavigationListItem>
                    <NavigationListItem
                        index={2}
                        onClick={(event: React.MouseEvent) => handleListItemClick(event, 2)}
                        selectedIndex={selectedIndex}
                        iconType={'starred'}
                    >
                        Starred
                    </NavigationListItem>
                </List>
            </NavigationBodyBox>
        </>
    );
};

export default NavigationBody;
