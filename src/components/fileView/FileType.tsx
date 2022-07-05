import { Folder, InsertDriveFile } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';

const FileType = (fileType: string) => {
    switch (fileType) {
        case 'folder':
            return <Folder sx={{ color: 'rgb(140, 90, 90)' }} />;
        case 'file':
            return <InsertDriveFile sx={{ color: 'rgb(23, 135, 220)' }} />;
        case 'png':
            return <ImageIcon sx={{ color: 'rgb(242, 34, 34)', mt: 0.4 }} />;
        // TODO:
        default:
            return <InsertDriveFile sx={{ color: 'rgb(165, 200, 67)' }} />;
    }
};

export default FileType;
