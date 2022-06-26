import {
    Avatar,
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import i18next from 'i18next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SharedI } from '../../../data/fakedata';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import FileType from '../../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
import TableHeader from '../tableHeaders/SharedHeader';

type Order = 'asc' | 'desc';

const SharedTable: React.FC<{ filesArray: any[] }> = (props) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof SharedI>('name');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const fileicon = FileType('folder');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof SharedI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const history = useHistory();

    const rowFiles = stableSort(props.filesArray, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((file, index) => {
            const isItemSelected = isSelected(file, selectedFiles);
            const labelId = `enhanced-table-checkbox-${index}`;
            const stringDate = ISOStringToDateString(file.stateCreatedAt, locales);
            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, file, selectedFiles, dispatch)}
                    onContextMenu={(event) => handleContextMenuClick(event, file, selectedFiles, dispatch)}
                    onKeyDown={(event) => handleKeyDown(event, props.filesArray, dispatch)}
                    onDoubleClick={(event) => handleDoubleClick(event, file, history, dispatch)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={file.name}
                    selected={isItemSelected}
                >
                    <TableCell padding="checkbox">{fileicon}</TableCell>
                    <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{
                            width: '60%',
                        }}
                        align={dir}
                    >
                        {file.name}
                    </TableCell>

                    <TableCell align={dir}>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: 'space-between',
                                width: '115px',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: '23px',
                                    height: '23px',
                                }}
                            />

                            <Typography variant="body2">{'maya fisher'}</Typography>
                        </Stack>
                    </TableCell>

                    <TableCell
                        sx={{
                            width: '15%',
                        }}
                        align={dir}
                    >
                        {stringDate}
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

export default SharedTable;
