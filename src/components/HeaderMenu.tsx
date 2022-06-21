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
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../store/global';
import { popupActions } from '../store/popups';
import { getCookieValue } from '../utils/cookies';

const Icons = styled(Box)(() => ({
    display: 'flex',
    marginBottom: '10px',
    gap: '10px',
    alignItems: 'center',
}));

const MoreVertClick = () => {
    console.log('MoreVertClick');
};

const HeaderMenu = () => {
    const dispatch = useDispatch();

    const isGridView = getCookieValue('isGridView') === 'true';
    const files = useSelector((state: any) => state.files.selected);

    const isGridViewClick = () => {
        document.cookie = `isGridView=${!isGridView}`;
    };

    const handleInfoOpen = () => {
        dispatch(popupActions.setInfo());
    };

    const handleShareOpen = () => {
        dispatch(popupActions.setShare());
    };

    return (
        <Icons>
            {files.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <IconButton>
                        <InsertLink onClick={handleShareOpen} />
                    </IconButton>
                    <IconButton>
                        <PersonAddAltOutlined onClick={handleShareOpen} />
                    </IconButton>
                    <IconButton>
                        <RestoreOutlined />
                    </IconButton>
                    <IconButton>
                        <DeleteOutline />
                    </IconButton>
                    <IconButton>
                        <MoreVert onClick={MoreVertClick} />
                    </IconButton>
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
