import DownloadIcon from '@mui/icons-material/Download';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import i18next from 'i18next';

type props = {
    handleClose: () => void;
};

const Download: React.FC<props> = ({ handleClose }) => {
    const onDownload = () => {
        console.log('Download');
        handleClose();
        fetch(`http://localhost:7000/api/storage/bucket/62655a5dd681ae7e5f9eafe0/key/62655a5dd681ae7e5f9eafe2`)
            .then((res) => {
                res.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((err) => {});
    };
    return (
        <MenuItem onClick={onDownload}>
            <ListItemIcon>
                <DownloadIcon />
            </ListItemIcon>
            <ListItemText>{`${i18next.t('contextMenu.Download')}`}</ListItemText>
        </MenuItem>
    );
};

export default Download;
