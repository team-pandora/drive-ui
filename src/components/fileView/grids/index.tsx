import { Box, Grid, styled } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    handleClick,
    handleContextMenuClick,
    handleDoubleClick,
    handleKeyDown,
} from '../../../functions/clickHandlers';
import { isSelected } from '../../../utils/files';
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
    isLoading: boolean;
};

const MyDriveGrid: React.FC<props> = ({ filesArray, isLoading }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const folders = filesArray.map((tempFolder, index) => {
        const folder = tempFolder.state ? tempFolder.state : tempFolder;
        const isItemSelected = isSelected(folder, selectedFiles);
        if (folder.type === 'folder')
            return (
                <GridObject
                    file={folder}
                    handleClick={(event: any) => handleClick(event, folder, selectedFiles, dispatch)}
                    handleContextMenu={(event: any) => handleContextMenuClick(event, folder, selectedFiles, dispatch)}
                    onKeyDown={(event: any) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    onDoubleClick={(event: any) => handleDoubleClick(event, folder, history, dispatch)}
                    index={index}
                    isSelected={isItemSelected}
                />
            );
        return <></>;
    });

    const files = filesArray.map((tempFile, index) => {
        const file = tempFile.state ? tempFile.state : tempFile;
        const isItemSelected = isSelected(file, selectedFiles);
        if (file.type === 'file')
            return (
                <GridObject
                    file={file}
                    handleClick={(event: any) => handleClick(event, file, selectedFiles, dispatch)}
                    handleContextMenu={(event: any) => handleContextMenuClick(event, file, selectedFiles, dispatch)}
                    onKeyDown={(event: any) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    onDoubleClick={(event: any) => handleDoubleClick(event, file, history, dispatch)}
                    index={index}
                    isSelected={isItemSelected}
                />
            );
        return <></>;
    });

    console.log(filesArray);

    return (
        <SBox>
            <GridHeader label={i18next.t('titles.Folders')} />
            <Box>
                <Grid
                    onKeyDown={(event) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    container
                    spacing={3}
                    gap={3}
                    wrap="wrap"
                >
                    {folders}
                </Grid>
            </Box>
            <br />
            <GridHeader label={i18next.t('titles.Files')} />
            <Box>
                <Grid
                    onKeyDown={(event) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    container
                    spacing={3}
                    gap={3}
                    wrap="wrap"
                >
                    {files}
                </Grid>
            </Box>
            <ContextMenu page="MyDrive" />
        </SBox>
    );
};

export default MyDriveGrid;
