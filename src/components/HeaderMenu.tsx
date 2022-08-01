import {
    CalendarViewMonth,
    DeleteOutline,
    InfoOutlined,
    InsertLink,
    MoreVert,
    PersonAddAltOutlined,
    RestoreOutlined,
    Toc,
} from '@mui/icons-material';
import { Box, Divider, IconButton, styled } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { restoreFile } from '../api/files';
import { handleRemoveFiles } from '../functions/apiHandlers';
import { filesActions } from '../store/files';
import { globalActions } from '../store/global';
import { notificationsActions } from '../store/notifications';
import { popupActions } from '../store/popups';
import { selectGetFilesFunc } from '../utils/files';

const Icons = styled(Box)(() => ({
    display: 'flex',
    marginBottom: '10px',
    gap: '10px',
    alignItems: 'center',
}));

type props = {
    page: string;
};

const HeaderMenu: React.FC<props> = ({ page }) => {
    const dispatch = useDispatch();

    const isGridView = useSelector((state: any) => state.global.isGridView);
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const MoreVertClick = (event: any) => {
        dispatch(globalActions.setContextMenu());
        dispatch(globalActions.setContextMenuPosition({ x: event.clientX, y: event.clientY }));
    };

    const isGridViewClick = () => {
        dispatch(globalActions.setIsGridView());
    };

    const handleInfoOpen = () => {
        dispatch(popupActions.setInfo());
    };

    const handleShareOpen = () => {
        dispatch(popupActions.setShare());
    };

    const handleDelete = async () => {
        if (page === i18next.t('titles.Trash')) {
            dispatch(popupActions.setRemove());
        } else {
            handleRemoveFiles(selectedFiles, dispatch);
        }
    };

    const handleRestore = async () => {
        try {
            await Promise.all(selectedFiles.map(restoreFile));

            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FileRestoredSuccessfully')}`
                    : `${i18next.t('messages.FilesRestoredSuccessfully')}`;
            dispatch(filesActions.setFiles(await selectGetFilesFunc()(selectedFiles[0].parent)));
            dispatch(notificationsActions.setSimpleOpen(message));
        } catch (error) {
            const message =
                selectedFiles.length === 1
                    ? `${i18next.t('messages.FailedRestoreFile')}`
                    : `${i18next.t('messages.FailedRestoreFiles')}`;
            toast.error(message);
        }
    };

    return (
        <Icons>
            {selectedFiles.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    {page !== i18next.t('titles.Trash') && (
                        <>
                            <IconButton onClick={handleShareOpen}>
                                <InsertLink />
                            </IconButton>
                            <IconButton onClick={handleShareOpen}>
                                <PersonAddAltOutlined />
                            </IconButton>
                        </>
                    )}
                    {page === i18next.t('titles.Trash') && (
                        <IconButton onClick={handleRestore}>
                            <RestoreOutlined />
                        </IconButton>
                    )}
                    <IconButton onClick={handleDelete}>
                        <DeleteOutline />
                    </IconButton>
                    {page !== i18next.t('titles.Trash') && (
                        <IconButton onClick={(event) => MoreVertClick(event)}>
                            <MoreVert />
                        </IconButton>
                    )}
                </Box>
            )}
            {selectedFiles.length > 0 && <Divider orientation="vertical" flexItem />}
            {isGridView ? (
                <IconButton onClick={isGridViewClick}>
                    <CalendarViewMonth />{' '}
                </IconButton>
            ) : (
                <IconButton onClick={isGridViewClick}>
                    <Toc />
                </IconButton>
            )}
            <IconButton onClick={handleInfoOpen} disabled={!(selectedFiles.length === 1)}>
                <InfoOutlined />
            </IconButton>
        </Icons>
    );
};

export default HeaderMenu;
