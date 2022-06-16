import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MyDriveI } from '../../data/fakedata';
import { filesActions } from '../../store/files';
import { globalActions } from '../../store/global';
import { getComparator, stableSort } from '../../utils/sort';
import { ISOStringToDateString } from '../../utils/time';
import ContextMenu from '../contextMenu/ContextMenu';
import FileType from '../FileType';
import TableHeader from '../tableHeaders/MyDriveHeader';

type Order = 'asc' | 'desc';

type props = { filesArray: any[] };

const MyDriveTable: React.FC<props> = ({ filesArray }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';

    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof MyDriveI>('owner');
    const [page, setPage] = useState(0);
    const rowsPerPage = 100;

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            console.log(file);
            // createFile(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    const fileicon = FileType('folder');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MyDriveI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, file: any) => {
        const selectedIndex = selectedFiles.indexOf(file.stateId);
        let newSelected: readonly string[] = [];
        if (event.ctrlKey) {
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selectedFiles, file.stateId);
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
            dispatch(filesActions.setSelected([file.stateId]));
        }
    };

    const handleSelectAllClick = (event: any) => {
        if (event.key === 'a' && event.ctrlKey) {
            event.preventDefault();
            const allRowsNames = filesArray.map((n) => n.stateId);
            dispatch(filesActions.setSelected(allRowsNames));
        }
    };

    const handleContextMenuClick = (event: React.MouseEvent<unknown>, file: any) => {
        event.preventDefault();
        if (selectedFiles.length <= 1) {
            dispatch(filesActions.setSelected([file.stateId]));
        }
        dispatch(globalActions.setContextMenu());
        dispatch(globalActions.setContextMenuPosition({ x: event.clientX, y: event.clientY }));
    };

    const handleDoubleClick = (event: any, file: any) => {
        history.push(`/folder/${file.fsObjectId}`);
        dispatch(filesActions.setSelected([]));
    };

    const isSelected = (file: any) => {
        return selectedFiles.indexOf(file.stateId) !== -1;
    };

    return (
        <Box {...getRootProps()}>
            <input {...getInputProps()} />
            <Paper elevation={0} sx={{ mb: 2 }}>
                <TableContainer
                    sx={{
                        maxHeight: 800,
                    }}
                >
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

                        <TableBody>
                            {stableSort(filesArray, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const stringDate = ISOStringToDateString(row.fsObjectUpdatedAt, locales);
                                    return (
                                        <TableRow
                                            sx={{
                                                backgroundColor: isDragActive ? '#e0e0e0' : 'white',
                                            }}
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            onContextMenu={(event) => handleContextMenuClick(event, row)}
                                            onKeyDown={(event) => handleSelectAllClick(event)}
                                            onDoubleClick={(event) => handleDoubleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.fsObjectUpdatedAt}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">{fileicon}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{
                                                    width: '45%',
                                                }}
                                                align={dir}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell sx={{ width: '20%' }} align={dir}>
                                                {'אני'}
                                            </TableCell>
                                            <TableCell align={dir}>{stringDate}</TableCell>
                                            <TableCell sx={{ width: '8%' }} align={dir}>
                                                {row.size ? row.size : '-'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <ContextMenu />
        </Box>
    );
};

export default MyDriveTable;
