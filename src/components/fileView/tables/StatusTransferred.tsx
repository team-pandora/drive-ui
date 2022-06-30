import { Avatar, Box, Paper, styled, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusTransferredI } from '../../../data/fakedata';
import { filesActions } from '../../../store/files';
import { globalActions } from '../../../store/global';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import FileType from '../FileType';
import StatusTimeline from '../../layout/StatusTimeline';
import TableHeader from '../tableHeaders/StatusTransferredHeader';

type Order = 'asc' | 'desc';

const StatusBox = styled(Box)({
    width: '100%',
    height: '30px',
    //   backgroundColor: "pink",
    display: 'flex',
    alignItems: 'center',
});

const StatusTransferredTable: React.FC<{ filesArray: any[] }> = (props) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof StatusTransferredI>('owner');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const fileIcon = FileType('file');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StatusTransferredI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, file: any) => {
        const selectedIndex = selectedFiles.indexOf(file.fileId);
        let newSelected: readonly string[] = [];

        if (event.ctrlKey) {
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selectedFiles, file.fileId);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selectedFiles.slice(1));
            } else if (selectedIndex === selectedFiles.length - 1) {
                newSelected = newSelected.concat(selectedFiles.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selectedFiles.slice(0, selectedIndex),
                    selectedFiles.slice(selectedIndex + 1),
                );
            }

            dispatch(filesActions.setSelected(newSelected));
        } else {
            dispatch(filesActions.setSelected([file.fileId]));
        }
    };

    const handleSelectAllClick = (event: any) => {
        if (event.key === 'a' && event.ctrlKey) {
            event.preventDefault();
            const allRowsNames = props.filesArray.map((n) => n.stateId);
            dispatch(filesActions.setSelected(allRowsNames));
        }
    };

    const handleContextMenuClick = (event: React.MouseEvent<unknown>, file: any) => {
        event.preventDefault();
        if (selectedFiles.length <= 1) {
            dispatch(filesActions.setSelected([file.fileId]));
        }
        dispatch(globalActions.setContextMenu());
        dispatch(globalActions.setContextMenuPosition({ x: event.clientX, y: event.clientY }));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const isSelected = (file: any) => {
        return selectedFiles.indexOf(file.fileId) !== -1;
    };

    return (
        <Box>
            <Paper elevation={0}>
                <TableContainer
                    sx={{
                        maxHeight: 800,
                    }}
                >
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>
                            {stableSort(props.filesArray, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const stringDate = ISOStringToDateString(row.createdAt, locales);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            onContextMenu={(event) => handleContextMenuClick(event, row)}
                                            onKeyDown={(event) => handleSelectAllClick(event)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">{fileIcon}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{
                                                    width: '18%',
                                                }}
                                                align={dir}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell sx={{ width: '8%' }} align={dir}>
                                                {row.classification}
                                            </TableCell>
                                            <TableCell align={dir} sx={{ width: '10%' }}>
                                                {'מישהו'}
                                            </TableCell>
                                            <TableCell sx={{ width: '15%' }} align={dir}>
                                                <Avatar
                                                    sx={{
                                                        width: '23px',
                                                        height: '23px',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: '15%' }} align={dir}>
                                                {stringDate}
                                            </TableCell>
                                            <TableCell sx={{ width: '25%' }} align={dir}>
                                                <StatusTimeline statusArray={row.status} />
                                            </TableCell>
                                            <TableCell sx={{ width: '10%' }} align={dir}>
                                                {row.destination}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {/* <ContextMenu /> */}
        </Box>
    );
};

export default StatusTransferredTable;
