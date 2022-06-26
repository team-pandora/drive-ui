import {
    Box,
    Button,
    Paper,
    styled,
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
import { TrashI } from '../../../data/fakedata';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import TrashContextMenu from '../../contextMenu/TrashContextMenu';
import FileType from '../../FileType';
import { handleClick, handleContextMenuClick, handleKeyDown, isSelected } from '../functions';
import TableHeader from '../tableHeaders/TrashHeader';

type Order = 'asc' | 'desc';

const SBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
    width: '100%',
    height: '50px',
    backgroundColor: '#F1F3F4',
    borderRadius: '4px',
}));

const TrashTable: React.FC<{ filesArray: any[] }> = (props) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TrashI>('owner');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const fileicon = FileType('folder');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TrashI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.filesArray.length) : 0;

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
                    <TableCell sx={{ width: '10%' }} align={dir}>
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
        <Box sx={{ width: '100%' }}>
            <Paper elevation={0} sx={{ width: '100%', mb: 2 }}>
                <SBox>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            margin: '0px 1%',
                        }}
                        variant="body2"
                        gutterBottom
                        component="div"
                    >
                        {`${i18next.t('messages.BinMsg')}`}
                    </Typography>
                    <Button sx={{ color: '#000000', margin: '0px 1%', textTransform: 'none' }}>{`${i18next.t(
                        'buttons.Bin',
                    )}`}</Button>
                </SBox>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>{rowFiles}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <TrashContextMenu />
        </Box>
    );
};

export default TrashTable;
