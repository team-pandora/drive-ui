import { Folder, InsertDriveFile } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

const FileType = (fileType: string) => {
    switch (fileType) {
        case 'folder':
            return <Folder sx={{ color: 'rgb(95, 99, 104)' }} />;
        case 'file':
            return <InsertDriveFile sx={{ color: 'rgb(95, 99, 104)' }} />;
        case 'png':
            return (
                <SvgIcon>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
            );
        // TODO:
        default:
            return <Folder sx={{ color: 'rgb(95, 99, 104)' }} />;
    }
};

export default FileType;
