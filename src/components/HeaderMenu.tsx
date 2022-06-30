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
import { globalActions } from '../store/global';
import { popupActions } from '../store/popups';

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
    const files = useSelector((state: any) => state.files.selected);

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

    const handleDelete = () => {
        if (page === i18next.t('titles.Trash')) {
            dispatch(popupActions.setRemove());
        } else {
            console.log('delete');
        }
    };

    const handleRestore = () => {
        console.log('restore');
    };

    return (
        <Icons>
            {files.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    {page !== i18next.t('titles.Trash') && (
                        <>
                            <IconButton>
                                <InsertLink onClick={handleShareOpen} />
                            </IconButton>
                            <IconButton>
                                <PersonAddAltOutlined onClick={handleShareOpen} />
                            </IconButton>
                        </>
                    )}
                    {page === i18next.t('titles.Trash') && (
                        <IconButton>
                            <RestoreOutlined onClick={handleRestore} />
                        </IconButton>
                    )}
                    <IconButton>
                        <DeleteOutline onClick={handleDelete} />
                    </IconButton>
                    {page !== i18next.t('titles.Trash') && (
                        <IconButton>
                            <MoreVert onClick={(event) => MoreVertClick(event)} />
                        </IconButton>
                    )}
                </Box>
            )}
            {files.length > 0 && <Divider orientation="vertical" flexItem />}
            <IconButton>
                {!isGridView && <CalendarViewMonth onClick={isGridViewClick} />}
                {isGridView && <Toc onClick={isGridViewClick} />}
            </IconButton>
            <IconButton>
                <InfoOutlined onClick={handleInfoOpen} />
            </IconButton>
        </Icons>
    );
};

export default HeaderMenu;
