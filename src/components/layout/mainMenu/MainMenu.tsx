/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { CreateNewFolderOutlined, DriveFolderUpload, UploadFile } from '@mui/icons-material';
import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Excel from '../../../assets/Excel.png';
import PowerPoint from '../../../assets/PowerPoint.png';
import Word from '../../../assets/Word.png';
import { handleUploadFiles, handleUploadFolder } from '../../../functions/apiHandlers';
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
    const uploadFolderRef = useRef<any>();

    const onDrop = useCallback(async (acceptedFiles: any) => {
        const parentFolderId =
            window.location.pathname.slice(1).split('/')[0] === 'folder'
                ? window.location.pathname.slice(1).split('/')[1]
                : 'null';
        handleUploadFiles(parentFolderId, dispatch, acceptedFiles, history);
    }, []);

    const { open } = useDropzone({
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
                            uploadFolderRef.current?.click();
                        }}
                        text={`${i18next.t('mainMenu.UploadFolder')}`}
                    >
                        <input
                            onClick={handleClose}
                            onChange={() => {
                                handleUploadFolder(Array.from(uploadFolderRef.current?.files), dispatch);
                            }}
                            ref={uploadFolderRef}
                            type="file"
                            webkitdirectory=""
                            directory=""
                            multiple
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

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        directory?: string; // remember to make these attributes optional....
        webkitdirectory?: string;
    }
}

export default MainMenu;
