import { Box, List, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFile, getFiles, getSubfolders } from '../../../api/files';
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
};

const NavigationBody: React.FC<props> = ({ parent, setParent }) => {
    if (parent === undefined) return <NavigationRootBody setParent={setParent}></NavigationRootBody>;

    const [files, setFiles] = useState([]);
    const fetchData = async () => {
        setFiles(await getSubfolders(parent));
    };

    useEffect(() => {
        fetchData();
    }, [parent]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        setSelectedIndex(index);
    };

    const formattedFiles = files.map((file: any, index) => {
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
