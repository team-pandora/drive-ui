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
    Tooltip,
    Typography,
    Zoom,
} from '@mui/material';
import i18next from 'i18next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { scrollStyle } from '../../../constants/index';
import { SharedI } from '../../../data/fakedata';
import { getComparator, stableSort } from '../../../utils/sort';
import getRandomColor, { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
import NoFiles from '../NoFiles';
import TableHeader from '../tableHeaders/SharedHeader';
import { NoFilesBox, SharedWithMeIcon } from './NoFilesElements';

type Order = 'asc' | 'desc';

type props = {
    filesArray: any[];
    isLoading: boolean;
};

const SharedTable: React.FC<props> = ({ filesArray, isLoading }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dir = i18next.dir(i18next.language) === 'rtl' ? 'right' : 'left';
    const locales = i18next.dir(i18next.language) === 'ltr' ? 'en-US' : 'he-IL';
    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof SharedI>('name');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 100;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof SharedI) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const rowFiles = stableSort(filesArray, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((file: any, index) => {
            const isItemSelected = isSelected(file.state, selectedFiles);
            const labelId = `enhanced-table-checkbox-${index}`;
            const stringDate = ISOStringToDateString(file.state.stateCreatedAt, locales);
            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, file.state, selectedFiles, dispatch)}
                    onContextMenu={(event) => handleContextMenuClick(event, file.state, selectedFiles, dispatch)}
                    onKeyDown={(event) => handleKeyDown(event, filesArray, selectedFiles, dispatch)}
                    onDoubleClick={(event) => handleDoubleClick(event, file.state, history, dispatch)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={file.state.fsObjectId}
                    selected={isItemSelected}
                >
                    <TableCell padding="checkbox">
                        {FileType(file.state.type === 'folder' ? 'shared-folder' : file.state.type)}
                    </TableCell>
                    <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{
                            width: '60%',
                        }}
                        align={dir}
                    >
                        {file.state.name}
                    </TableCell>

                    <TableCell align={dir}>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: 'space-between',
                                width: '115px',
                            }}
                        >
                            <Tooltip
                                title={
                                    <>
                                        <Typography dir={i18next.dir(i18next.language)} variant="subtitle2">
                                            {file.owner.fullName}
                                        </Typography>
                                        <Typography variant="subtitle2">{file.owner.mail}</Typography>
                                    </>
                                }
                                placement="bottom"
                                TransitionComponent={Zoom}
                            >
                                <Avatar
                                    sx={{
                                        width: '23px',
                                        height: '23px',
                                        bgcolor: `${getRandomColor(file.owner.fullName)}`,
                                    }}
                                >
                                    <Typography variant="body1">{file.owner.fullName[0]}</Typography>
                                </Avatar>
                            </Tooltip>

                            <Typography variant="body2">{file.owner.fullName}</Typography>
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

    if (!isLoading && !filesArray.length) {
        return (
            <NoFilesBox>
                <NoFiles
                    message={i18next.t('noFilesMessages.shared.message')}
                    subMessage={i18next.t('noFilesMessages.shared.subMessage')}
                >
                    <SharedWithMeIcon />
                </NoFiles>
            </NoFilesBox>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Paper elevation={0} sx={{ mb: 2 }}>
                <TableContainer sx={scrollStyle}>
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>{rowFiles}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <ContextMenu page="Shared" />
        </Box>
    );
};

export default SharedTable;
