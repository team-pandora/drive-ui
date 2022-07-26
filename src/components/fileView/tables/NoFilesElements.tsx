import { AccessTimeFilled, FolderOff, InsertDriveFile, Star } from '@mui/icons-material';
import { Box, styled } from '@mui/material';

export const NoFilesBox = styled(Box)({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const SLogo = styled('img')({
    userSelect: 'none',
    width: '180px',
    height: '200px',
});

export const MyDriveIcon = styled(InsertDriveFile)({
    color: '#cce4fc',
    width: '180px',
    height: '200px',
});

export const SharedWithMeIcon = styled(FolderOff)({
    color: '#cce4fc',
    width: '180px',
    height: '200px',
});

export const RecentIcon = styled(AccessTimeFilled)({
    color: '#cce4fc',
    width: '180px',
    height: '200px',
});

export const StarredIcon = styled(Star)({
    color: '#cce4fc',
    width: '180px',
    height: '200px',
});

export const StorageIcon = styled(InsertDriveFile)({
    color: '#cce4fc',
    width: '180px',
    height: '200px',
});
