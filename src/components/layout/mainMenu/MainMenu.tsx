/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { CreateNewFolderOutlined, DriveFolderUpload, UploadFile } from '@mui/icons-material';
import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFiles, uploadFile } from '../../../api/files';
import Excel from '../../../assets/Excel.png';
import PowerPoint from '../../../assets/PowerPoint.png';
import Word from '../../../assets/Word.png';
import { filesActions } from '../../../store/files';
import { notificationsActions } from '../../../store/notifications';
import { popupActions } from '../../../store/popups';
import NewFolderPopup from '../../popups/newFolderPopup';
import Button from './Button';

type props = {
    handleClose: () => void;
    anchorEl: any;
    showMenu: boolean;
};

const MainMenu: React.FC<props> = ({ handleClose, anchorEl, showMenu }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const dir = i18next.dir(i18next.language);

    const onDrop = useCallback(async (acceptedFiles: any) => {
        const params = window.location.pathname.split('/');
        const folderId: string = params[1] === 'folder' ? params[2] : 'null';
        console.log(folderId);
        if (folderId === 'null') history.push(`/my-drive`);
        const filesWithStatus = acceptedFiles.map((file: any) => {
            return { name: file.name, status: 'uploading' };
        });

        dispatch(filesActions.setUploaded(filesWithStatus));
        dispatch(notificationsActions.setUploadOpen());

        for (const file of acceptedFiles) {
            uploadFile(file, folderId)
                .then(async () => {
                    dispatch(filesActions.setFiles(await getFiles(folderId)));
                    dispatch(filesActions.setUploadedDone(file));
                })
                .catch(() => {
                    dispatch(filesActions.setUploadedFailed(file));
                });
        }
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: false,
    });

    const handleDialog = () => {
        open();
        handleClose();
    };

    const handleNewFolderDialog = () => {
        handleClose();
        dispatch(popupActions.setNewFolder());
    };

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={showMenu}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                dir={dir}
            >
                <MenuList sx={{ width: 300 }} dense>
                    <Button onClick={handleNewFolderDialog} text={`${i18next.t('mainMenu.Folder')}`}>
                        <CreateNewFolderOutlined />
                    </Button>

                    <Divider />

                    <Button onClick={handleDialog} text={`${i18next.t('mainMenu.UploadFiles')}`}>
                        <UploadFile />
                    </Button>

                    <Button onClick={handleClose} text={`${i18next.t('mainMenu.UploadFolder')}`}>
                        <DriveFolderUpload />
                    </Button>

                    <Divider />

                    <Button onClick={handleClose} text={`${i18next.t('mainMenu.Word')}`}>
                        <img src={Word} height={25} width={25} />
                    </Button>

                    <Button onClick={handleClose} text={`${i18next.t('mainMenu.Powerpoint')}`}>
                        <img src={PowerPoint} height={25} width={25} />
                    </Button>

                    <Button onClick={handleClose} text={`${i18next.t('mainMenu.Excel')}`}>
                        <img src={Excel} height={25} width={25} />
                    </Button>
                </MenuList>
            </Menu>
            <NewFolderPopup />
        </>
    );
};

export default MainMenu;
