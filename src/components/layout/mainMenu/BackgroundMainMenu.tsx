/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { CreateNewFolderOutlined, DriveFolderUpload, UploadFile } from '@mui/icons-material';
import { Divider, Menu, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handleDropFile } from '../../../api/files';
import Excel from '../../../assets/Excel.png';
import PowerPoint from '../../../assets/PowerPoint.png';
import Word from '../../../assets/Word.png';
import { globalActions } from '../../../store/global';
import { popupActions } from '../../../store/popups';
import NewFolderPopup from '../../popups/newFolderPopup';
import Button from './Button';

type props = {
    handleClose: () => void;
    showMenu: boolean;
};

const BackgroundMainMenu: React.FC<props> = ({ handleClose, showMenu }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language);
    const backgroundMenuPosition = useSelector((state: any) => state.global.backgroundMenuPosition);
    const parentFolderId =
        window.location.pathname.slice(1).split('/')[0] === 'folder'
            ? window.location.pathname.slice(1).split('/')[1]
            : 'null';
    const onDrop = useCallback(
        async (acceptedFiles: any) => {
            handleDropFile(parentFolderId, dispatch, acceptedFiles, history);
        },
        [parentFolderId],
    );

    const { open } = useDropzone({
        onDrop,
        noClick: false,
    });

    const handleDialog = () => {
        open();
        dispatch(globalActions.setBackgroundMenu());
    };

    const handleNewFolderDialog = () => {
        handleClose();
        dispatch(popupActions.setNewFolder());
    };

    return (
        <>
            <Menu
                sx={{
                    '& .MuiPaper-root': {
                        padding: 0,
                        borderRadius: '8px',
                    },
                }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={showMenu}
                keepMounted={true}
                anchorEl={null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{
                    top: backgroundMenuPosition.y,
                    left: backgroundMenuPosition.x,
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

export default BackgroundMainMenu;
