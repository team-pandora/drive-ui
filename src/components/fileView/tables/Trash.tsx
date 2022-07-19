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
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteFile, getTrashFiles } from '../../../api/files';
import { TrashI } from '../../../data/fakedata';
import { filesActions } from '../../../store/files';
import { notificationsActions } from '../../../store/notifications';
import { fileSizeFormatter } from '../../../utils/files';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import TrashContextMenu from '../../contextMenu/TrashContextMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
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

type props = { filesArray: any[] };

const TrashTable: React.FC<props> = ({ filesArray }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TrashI>('owner');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TrashI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const emptyTrash = async () => {
        try {
            await Promise.all(filesArray.map(deleteFile));

            const message = `${i18next.t('messages.BinEmpty')}`;

            dispatch(filesActions.setFiles(await getTrashFiles()));
            dispatch(notificationsActions.setSimpleOpen(message));
        } catch (error) {
            const message = selectedFiles.length === `${i18next.t('messages.BinEmptyFailed')}`;
            toast.error(message);
        }
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filesArray.length) : 0;

    const rowFiles = stableSort(filesArray, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((file: any, index) => {
            const isItemSelected = isSelected(file, selectedFiles);
            const labelId = `enhanced-table-checkbox-${index}`;
            const stringDate = ISOStringToDateString(file.fsObjectUpdatedAt, locales);
            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, file, selectedFiles, dispatch)}
                    onContextMenu={(event) => handleContextMenuClick(event, file, selectedFiles, dispatch)}
                    onKeyDown={(event) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    onDoubleClick={(event) => handleDoubleClick(event, file, history, dispatch)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={file.fsObjectUpdatedAt}
                    selected={isItemSelected}
                >
                    <TableCell padding="checkbox">{FileType(file.type)}</TableCell>
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
                        {file.size ? fileSizeFormatter(file.size) : '-'}
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
                    <Button
                        onClick={emptyTrash}
                        sx={{ color: '#000000', margin: '0px 1%', textTransform: 'none' }}
                    >{`${i18next.t('buttons.Bin')}`}</Button>
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
