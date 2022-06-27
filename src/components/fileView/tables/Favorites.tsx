import { Star } from '@mui/icons-material';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoritesI } from '../../../data/fakedata';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleKeyDown, isSelected } from '../functions';
import TableHeader from '../tableHeaders/FavoritesHeader';

type Order = 'asc' | 'desc';

const FavoritesTable: React.FC<{ filesArray: any[] }> = (props) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof FavoritesI>('owner');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const fileIcon = FileType('folder');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof FavoritesI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const rowFiles = stableSort(props.filesArray, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((file, index) => {
            const isItemSelected = isSelected(file, selectedFiles);
            const labelId = `enhanced-table-checkbox-${index}`;
            const stringDate = ISOStringToDateString(file.fsObjectUpdatedAt, locales);
            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, file, selectedFiles, dispatch)}
                    onContextMenu={(event) => handleContextMenuClick(event, file, selectedFiles, dispatch)}
                    onKeyDown={(event) => handleKeyDown(event, props.filesArray, dispatch)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={file.name}
                    selected={isItemSelected}
                >
                    <TableCell padding="checkbox">{FileType('folder')}</TableCell>
                    <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{
                            width: '45%',
                        }}
                        align={dir}
                    >
                        <Box
                            sx={{
                                width: '100px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            {file.name}
                            <Star
                                sx={{
                                    color: '#fdd85d',
                                    margin: '5px',
                                    width: '15px',
                                    height: '15px',
                                }}
                            />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ width: '20%' }} align={dir}>
                        {file.owner}
                    </TableCell>
                    <TableCell align={dir}>{stringDate}</TableCell>
                    <TableCell sx={{ width: '8%' }} align={dir}>
                        {file.size ? file.size : '-'}
                    </TableCell>
                </TableRow>
            );
        });

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
                        <TableBody>{rowFiles}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <ContextMenu />
        </Box>
    );
};

export default FavoritesTable;
