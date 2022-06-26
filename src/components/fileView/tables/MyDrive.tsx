import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MyDriveI } from '../../../data/fakedata';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import FileType from '../../FileType';
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

    const rowFiles = stableSort(filesArray, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((file, index) => {
            const isItemSelected = isSelected(file, selectedFiles);
            const labelId = `enhanced-table-checkbox-${index}`;
            const stringDate = ISOStringToDateString(file.fsObjectUpdatedAt, locales);
            return (
                <TableRow
                    sx={{
                        backgroundColor: isDragActive ? '#e0e0e0' : 'white',
                    }}
                    hover
                    onClick={(event) => handleClick(event, file, selectedFiles, dispatch)}
                    onContextMenu={(event) => handleContextMenuClick(event, file, selectedFiles, dispatch)}
                    onKeyDown={(event) => handleKeyDown(event, filesArray, dispatch)}
                    onDoubleClick={(event) => handleDoubleClick(event, file, history, dispatch)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={file.fsObjectUpdatedAt}
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
                        {file.name}
                    </TableCell>
                    <TableCell sx={{ width: '20%' }} align={dir}>
                        {'אני'}
                    </TableCell>
                    <TableCell align={dir}>{stringDate}</TableCell>
                    <TableCell sx={{ width: '8%' }} align={dir}>
                        {file.size ? file.size : '-'}
                    </TableCell>
                </TableRow>
            );
        });

    return (
        <Box {...getRootProps()}>
            <input {...getInputProps()} />
            <Paper elevation={0} sx={{ mb: 2 }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>{rowFiles}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <ContextMenu />
        </Box>
    );
};

export default MyDriveTable;
