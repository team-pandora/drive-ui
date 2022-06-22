import { CreateNewFolderOutlined, DriveFolderUpload, Image, UploadFile } from '@mui/icons-material';
import { Divider, Icon, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import i18next from 'i18next';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { popupActions } from '../store/popups';
import NewFolderPopup from './popups/newFolderPopup';
import PowerPoint from '../assets/PowerPoint.png';
import Word from '../assets/Word.png';
import Excel from '../assets/Excel.png';

type props = {
    handleClose: () => void;
    anchorEl: any;
    showMenu: boolean;
};

const MainMenu: React.FC<props> = ({ handleClose, anchorEl, showMenu }) => {
    const dir = i18next.dir(i18next.language);
    const dispatch = useDispatch();

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
        // const res = uploadFile(acceptedFiles[0]);
        // console.log(res);
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
            {/* TODO: */}
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
                    <MenuItem onClick={handleNewFolderDialog}>
                        <ListItemIcon>
                            <CreateNewFolderOutlined />
                        </ListItemIcon>
                        <ListItemText>{`${i18next.t('mainMenu.Folder')}`}</ListItemText>
                    </MenuItem>

                    <Divider />

                    <MenuItem onClick={handleDialog}>
                        <ListItemIcon>
                            <UploadFile />
                        </ListItemIcon>
                        <ListItemText>{`${i18next.t('mainMenu.UploadFiles')}`}</ListItemText>{' '}
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <DriveFolderUpload />
                        </ListItemIcon>
                        <ListItemText>{`${i18next.t('mainMenu.UploadFolder')}`}</ListItemText>{' '}
                    </MenuItem>

                    <Divider />

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Icon>
                                <img src={Word} height={25} width={25} />
                            </Icon>
                        </ListItemIcon>
                        <ListItemText>{`${i18next.t('mainMenu.Word')}`}</ListItemText>
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon onClick={handleClose}>
                            <Icon>
                                <img src={PowerPoint} height={25} width={25} />
                            </Icon>
                        </ListItemIcon>
                        <ListItemText>{`${i18next.t('mainMenu.Powerpoint')}`}</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Icon>
                                <img src={Excel} height={25} width={25} />
                            </Icon>
                        </ListItemIcon>
                        <ListItemText>{`${i18next.t('mainMenu.Excel')}`}</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
            <NewFolderPopup />
        </>
    );
};

export default MainMenu;
