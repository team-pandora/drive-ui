/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { CreateNewFolderOutlined, DriveFolderUpload, UploadFile } from '@mui/icons-material';
import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handleDropFile } from '../../../api/files';
import Excel from '../../../assets/Excel.png';
import PowerPoint from '../../../assets/PowerPoint.png';
import Word from '../../../assets/Word.png';
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
    console.log(window.location.pathname.slice(1).split('/')[0]);
    const parentFolderId =
        window.location.pathname.slice(1).split('/')[0] === 'folder'
            ? window.location.pathname.slice(1).split('/')[1]
            : 'null';
    const dir = i18next.dir(i18next.language);
    const folderInputAttributes: any = { directory: '', webkitdirectory: '' };
    const uploadFolderRef = useRef<any>();

    const onDrop = useCallback(async (acceptedFiles: any) => {
        handleDropFile(parentFolderId, dispatch, acceptedFiles, history);
    }, []);

    const { open } = useDropzone({
        onDrop,
        noClick: false,
    });

    const handleDialog = () => {
        open();
        handleClose();
    };

    const handleUploadFolder = () => {
        uploadFolderRef?.current?.click();
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
                <MenuList sx={{ width: 300, outline: 'none', border: 'none' }} dense>
                    <Button onClick={handleNewFolderDialog} text={`${i18next.t('mainMenu.Folder')}`}>
                        <CreateNewFolderOutlined />
                    </Button>

                    <Divider />

                    <Button onClick={handleDialog} text={`${i18next.t('mainMenu.UploadFiles')}`}>
                        <UploadFile />
                    </Button>

                    <Button
                        onClick={() => {
                            handleUploadFolder();
                        }}
                        text={`${i18next.t('mainMenu.UploadFolder')}`}
                    >
                        <input
                            onClick={handleClose}
                            ref={uploadFolderRef}
                            type="file"
                            {...folderInputAttributes}
                            hidden
                        />
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
