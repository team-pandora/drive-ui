import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MyDriveI } from '../../../data/fakedata';
import { globalActions } from '../../../store/global';
import { fileSizeFormatter } from '../../../utils/files';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import BackgroundMainMenu from '../../layout/mainMenu/BackgroundMainMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
import TableHeader from '../tableHeaders/MyDriveHeader';

type Order = 'asc' | 'desc';

type props = { filesArray: any[] };

const MyDriveTable: React.FC<props> = ({ filesArray }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const backgroundMenu = useSelector((state: any) => state.global.backgroundMenu);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof MyDriveI>('owner');
    const [page, setPage] = useState(0);
    const rowsPerPage = 100;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MyDriveI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const backgroundMainMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(globalActions.setBackgroundMenuPosition({ x: event.clientX, y: event.clientY }));
        dispatch(globalActions.setBackgroundMenu());
    };

    const tableRowRightClick = () => {
        // When row is clicked, background menu not supposed to appear.
        dispatch(globalActions.setBackgroundMenu());
    };

    const closeBackgroundMainMenu = () => {
        dispatch(globalActions.setBackgroundMenu());
    };

    const rowFiles = stableSort(filesArray, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((file: any, index) => {
            const isItemSelected = isSelected(file, selectedFiles);
            const labelId = `enhanced-table-checkbox-${index}`;
            const stringDate = ISOStringToDateString(file.fsObjectUpdatedAt, locales);
            return (
                <TableRow
                    sx={{
                        backgroundColor: 'white',
                    }}
                    hover
                    onClick={(event) => handleClick(event, file, selectedFiles, dispatch)}
                    onContextMenu={(event) => handleContextMenuClick(event, file, selectedFiles, dispatch)}
                    onKeyDown={(event) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    onDoubleClick={(event) => handleDoubleClick(event, file, history, dispatch)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={file.fsObjectUpdatedAt}
                    selected={isItemSelected}
                >
                    <TableCell padding="checkbox">{FileType(file.type)}</TableCell>
                    <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{
                            width: '45%',
                        }}
                        align={dir}
                    >
                        {file.name}
                    </TableCell>
                    <TableCell sx={{ width: '20%' }} align={dir}>
                        {'אני'}
                    </TableCell>
                    <TableCell align={dir}>{stringDate}</TableCell>
                    <TableCell sx={{ width: '8%' }} align={dir}>
                        {file.size ? fileSizeFormatter(file.size) : '-'}
                    </TableCell>
                </TableRow>
            );
        });

    // TODO: scroll
    const listInnerRef = useRef();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log('reached bottom');
            }
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }} onContextMenu={backgroundMainMenuClick} ref={listInnerRef}>
            <Paper elevation={0} sx={{ mb: 2 }} onContextMenu={tableRowRightClick}>
                <TableContainer
                    onScroll={onScroll}
                    sx={{
                        maxHeight: '87vh',
                        '&::-webkit-scrollbar': {
                            height: '16px',
                            overflow: 'visible',
                            width: '16px',
                        },
                        '&::-webkit-scrollbar-button': {
                            height: 0,
                            width: 0,
                        },
                        '&::-webkit-scrollbar-corner': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.2)',
                            backgroundClip: 'padding-box',
                            border: 'solid transparent',
                            borderWidth: '1px 6px 1px 1px',
                            minHeight: '28px',
                            padding: '100px 0 0',
                            '-webkit-box-shadow': 'inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)',
                            boxShadow: 'inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundClip: 'padding-box',
                            border: 'solid transparent',
                            borderWidth: '0 4px 0 0',
                        },
                    }}
                >
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>{rowFiles}</TableBody>
                    </Table>
                </TableContainer>
                <ContextMenu page="MyDrive" />
            </Paper>
            <BackgroundMainMenu handleClose={closeBackgroundMainMenu} showMenu={backgroundMenu} />
        </Box>
    );
};

export default MyDriveTable;
