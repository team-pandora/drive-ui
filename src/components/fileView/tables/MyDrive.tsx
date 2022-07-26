import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { scrollStyle } from '../../../constance/index';
import { MyDriveI } from '../../../data/fakedata';
import { globalActions } from '../../../store/global';
import { fileSizeFormatter } from '../../../utils/files';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import BackgroundMainMenu from '../../layout/mainMenu/BackgroundMainMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
import { NoFilesHeader } from '../NoFilesHeader';
import TableHeader from '../tableHeaders/MyDriveHeader';

type Order = 'asc' | 'desc';

type props = {
    filesArray: any[];
    isLoading: boolean;
};

const MyDriveTable: React.FC<props> = ({ filesArray, isLoading }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const backgroundMenu = useSelector((state: any) => state.global.backgroundMenu);
    // let startIndex = 0;
    // let endIndex = 22;
    const bring = 22;

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

    const rowFiles = stableSort(filesArray.slice(0, 22), getComparator(order, orderBy))
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

    const onScroll = (event: any) => {
        // console.log(event.currentTarget.scrollTop, event.currentTarget.clientHeight);
    };

    if (!isLoading && !filesArray.length) {
        return <NoFilesHeader />;
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }} onContextMenu={backgroundMainMenuClick}>
            <Paper elevation={0} sx={{ mb: 2 }} onContextMenu={tableRowRightClick}>
                <TableContainer onScroll={onScroll} sx={scrollStyle}>
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
