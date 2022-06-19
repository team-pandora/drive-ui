import { Box, Grid, styled } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { filesActions } from '../../../store/files';
import { globalActions } from '../../../store/global';
import ContextMenu from '../../contextMenu/ContextMenu';
import GridHeader from './GridHeader';
import GridObject from './GridObject';

const SBox = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    maxHeight: 800,
    marginTop: '10px',
    overflowY: 'auto',
    overflowX: 'hidden',
}));

type props = {
    filesArray: any[];
};

const MyDriveGrid: React.FC<props> = ({ filesArray }) => {
    const dispatch = useDispatch();
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const handleClick = (event: React.MouseEvent<unknown>, file: any) => {
        const selectedIndex = selectedFiles.indexOf(file.stateId);
        let newSelected: readonly string[] = [];
        if (event.ctrlKey) {
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selectedFiles, file.stateId);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selectedFiles.slice(1));
            } else if (selectedIndex === selectedFiles.length - 1) {
                newSelected = newSelected.concat(selectedFiles.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selectedFiles.slice(0, selectedIndex),
                    selectedFiles.slice(selectedIndex + 1),
                );
            }

            dispatch(filesActions.setSelected(newSelected));
        } else {
            dispatch(filesActions.setSelected([file.stateId]));
        }
    };

    const handleContextMenuClick = (event: React.MouseEvent<unknown>, file: any) => {
        event.preventDefault();
        if (selectedFiles.length <= 1) {
            dispatch(filesActions.setSelected([file.stateId]));
        }
        dispatch(globalActions.setContextMenu());
        dispatch(globalActions.setContextMenuPosition({ x: event.clientX, y: event.clientY }));
    };

    const isSelected = (file: any) => {
        return selectedFiles.indexOf(file.stateId) !== -1;
    };

    const folders = filesArray.map((file, index) => {
        const isItemSelected = isSelected(file);
        if (file.type === 'folder')
            return (
                <GridObject
                    file={file}
                    handleClick={handleClick}
                    handleContextMenu={handleContextMenuClick}
                    index={index}
                    isSelected={isItemSelected}
                />
            );
        return <></>;
    });

    const files = filesArray.map((file, index) => {
        const isItemSelected = isSelected(file);
        if (file.type === 'file')
            return (
                <GridObject
                    file={file}
                    handleClick={handleClick}
                    handleContextMenu={handleContextMenuClick}
                    index={index}
                    isSelected={isItemSelected}
                />
            );
        return <></>;
    });

    return (
        <SBox>
            <GridHeader label={i18next.t('titles.Folders')} />
            <Box>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 0, sm: 8, md: 15.5 }}>
                    {folders}
                </Grid>
            </Box>
            <br />
            <GridHeader label={i18next.t('titles.Files')} />
            <Box>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 0, sm: 8, md: 15.5 }}>
                    {files}
                </Grid>
            </Box>
            <ContextMenu />
        </SBox>
    );
};

export default MyDriveGrid;
