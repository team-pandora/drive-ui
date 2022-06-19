/* eslint-disable no-nested-ternary */
import { Folder, InsertDriveFile } from '@mui/icons-material';
import { Box, Grid, styled } from '@mui/material';
import GridTitle from './GridTitle';

const FolderItem = styled(Box)(() => ({
    backgroundColor: 'gray.100',
    width: '200px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid #dadce0',
}));

const FolderActiveItem = styled(Box)(() => ({
    backgroundColor: '#e8f0fe',
    width: '200px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    color: '#185abc', // none if not active
    borderRadius: '5px',
    border: '1px solid #dadce0',
}));

const FileItem = styled(Box)(() => ({
    backgroundColor: 'gray.100',
    width: '200px',
    height: '220px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    border: '1px solid #dadce0',
}));

const FileActiveItem = styled(Box)(() => ({
    backgroundColor: '#e8f0fe',
    width: '200px',
    height: '220px',
    display: 'flex',
    flexDirection: 'column',
    color: '#185abc',
    borderRadius: '5px',
    border: '1px solid #dadce0',
}));

const SBox = styled(Box)({
    width: '100%',
    height: '75%',
    backgroundColor: '#dadce0',
});

const iconStyle = {
    color: 'rgb(95, 99, 104)',
    padding: '0px 15px',
};

type props = {
    file: any;
    isSelected: boolean;
    index: number;
    handleClick: (event: any, file: any) => void;
    handleContextMenu: (event: any, file: any) => void;
};

const GridObject: React.FC<props> = ({ file, isSelected, index, handleClick, handleContextMenu }) => {
    const icon = file.type === 'folder' ? <Folder sx={iconStyle} /> : <InsertDriveFile sx={iconStyle} />;
    // TODO:
    const ItemComponent =
        file.type === 'folder' ? (isSelected ? FolderActiveItem : FolderItem) : isSelected ? FileActiveItem : FileItem;

    return (
        <Grid item xs={2} sm={2} md={2} key={index}>
            <ItemComponent
                onClick={(event) => handleClick(event, file)}
                onContextMenu={(event) => handleContextMenu(event, file)}
            >
                {/* TODO: */}
                {file.type === 'file' && <SBox></SBox>}
                <GridTitle fileName={file.name} icon={icon} />
            </ItemComponent>
        </Grid>
    );
};

export default GridObject;
