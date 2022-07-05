/* eslint-disable no-nested-ternary */
import { Box, Grid, styled } from '@mui/material';
import FileType from '../FileType';
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

const IconStyle = styled(Box)({
    color: 'rgb(95, 99, 104)',
    padding: '0px 15px',
});

type props = {
    file: any;
    isSelected: boolean;
    index: number;
    handleClick: any;
    handleContextMenu: any;
    onKeyDown: any;
    onDoubleClick: any;
};

const GridObject: React.FC<props> = ({
    file,
    isSelected,
    index,
    handleClick,
    handleContextMenu,
    onKeyDown,
    onDoubleClick,
}) => {
    const icon = <IconStyle>{FileType(file.type)}</IconStyle>;
    // TODO:
    const ItemComponent =
        file.type === 'folder' ? (isSelected ? FolderActiveItem : FolderItem) : isSelected ? FileActiveItem : FileItem;

    return (
        // on key down not working
        <Grid item xs={2} sm={2} md={2} key={index}>
            <ItemComponent
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                onKeyDown={onKeyDown}
                onDoubleClick={onDoubleClick}
            >
                {/* TODO: */}
                {file.type === 'file' && <SBox></SBox>}
                <GridTitle fileName={file.name} icon={icon} />
            </ItemComponent>
        </Grid>
    );
};

export default GridObject;
