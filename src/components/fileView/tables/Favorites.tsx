import { Star } from '@mui/icons-material';
import { Box, Paper, styled, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FavoritesI } from '../../../data/fakedata';
import { fileSizeFormatter } from '../../../utils/files';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
import NoFiles from '../NoFiles';
import TableHeader from '../tableHeaders/FavoritesHeader';
import { NoFilesBox, StarredIcon } from './NoFilesElements';

type Order = 'asc' | 'desc';

const SBox = styled(Box)({
    width: '45%',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
});

type props = {
    filesArray: any[];
    isLoading: boolean;
};

const FavoritesTable: React.FC<props> = ({ filesArray, isLoading }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof FavoritesI>('owner');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof FavoritesI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

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
                            width: '45%',
                        }}
                        align={dir}
                    >
                        <SBox>
                            {file.name}
                            <Star
                                sx={{
                                    color: '#fdd85d',
                                    margin: '5px',
                                    width: '15px',
                                    height: '15px',
                                }}
                            />
                        </SBox>
                    </TableCell>
                    <TableCell sx={{ width: '20%' }} align={dir}>
                        {file.owner}
                    </TableCell>
                    <TableCell align={dir}>{stringDate}</TableCell>
                    <TableCell sx={{ width: '8%' }} align={dir}>
                        {file.size ? fileSizeFormatter(file.size) : '-'}
                    </TableCell>
                </TableRow>
            );
        });

    if (!isLoading && !filesArray.length) {
        return (
            <NoFilesBox>
                <NoFiles
                    message={i18next.t('noFilesMessages.starred.message')}
                    subMessage={i18next.t('noFilesMessages.starred.subMessage')}
                >
                    <StarredIcon />
                </NoFiles>
            </NoFilesBox>
        );
    }

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
            <ContextMenu page="Favorites" />
        </Box>
    );
};

export default FavoritesTable;
