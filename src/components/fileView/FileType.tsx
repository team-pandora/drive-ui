import {
    Folder,
    InsertDriveFile,
    FolderShared,
    Article,
    PlayCircleOutline,
    KeyboardDoubleArrowDown,
    FileOpen,
} from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';

const FileType = (fileType: string) => {
    switch (fileType) {
        case 'folder':
            return <Folder sx={{ color: '#5f6368' }} />;
        case 'shared-folder':
            return <FolderShared sx={{ color: '#5f6368' }} />;
        case 'file':
            return <Article sx={{ color: 'rgb(23, 135, 220)' }} />;
        case 'shortcut':
            return <FileOpen sx={{ color: 'rgb(23, 135, 220)' }} />;
        case 'png':
            return <ImageIcon sx={{ color: 'rgb(242, 34, 34)', mt: 0.4 }} />;
        case 'zip':
            return <KeyboardDoubleArrowDown sx={{ color: 'rgb(242, 34, 34)', mt: 0.4 }} />;
        // TODO:
        default:
            return <Article sx={{ color: 'rgb(165, 200, 67)' }} />;
    }
};

export default FileType;
