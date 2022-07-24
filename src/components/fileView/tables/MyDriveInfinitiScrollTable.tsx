import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchFiles } from '../../../api/files';
import { MyDriveI } from '../../../data/fakedata';
import { globalActions } from '../../../store/global';
import { fileSizeFormatter } from '../../../utils/files';
import { getComparator, stableSort } from '../../../utils/sort';
import { ISOStringToDateString } from '../../../utils/time';
import ContextMenu from '../../contextMenu/ContextMenu';
import BackgroundMainMenu from '../../layout/mainMenu/BackgroundMainMenu';
import FileType from '../FileType';
import { handleClick, handleContextMenuClick, handleDoubleClick, handleKeyDown, isSelected } from '../functions';
import TableHeader from '../tableHeaders/MyDriveHeader';

type Order = 'asc' | 'desc';

type props = { filesArray: any[] };

const MyDriveInfinitiScrollTable: React.FC<props> = ({ filesArray }) => {
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

    const params: { folderId: string } = useParams();
    const folderId: string = params.folderId ? params.folderId : 'null';

    const {
        data: activityLog,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        error,
    } = useInfiniteQuery(['fetchFiles', folderId], ({ pageParam = 1 }) => fetchFiles(folderId, 22, pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            console.log('heelo');
            const nextPage = allPages.length * 10 + 1;
            return lastPage.length !== 0 ? nextPage : undefined;
        },
    });

    const observerElem = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) =>
                // eslint-disable-next-line consistent-return
                entries.forEach((entry) => {
                    // console.log('entry', entry);
                    // console.log('maya', entry.isIntersecting);
                    if (!entry.isIntersecting && !isFetchingNextPage) {
                        console.log('fetching');
                        return fetchNextPage();
                    }
                    if (entry.isIntersecting && !isFetchingNextPage) {
                        console.log('fetching2');
                        return fetchNextPage();
                    }
                    // return entry.isIntersecting && fetchNextPage();
                }),
            {
                rootMargin: '0px',
                threshold: 0,
            },
        );

        const el = observerElem && observerElem.current;

        if (!el) {
            return;
        }
        observer.observe(el);
        // eslint-disable-next-line consistent-return
        return () => {
            observer.unobserve(el);
        };
    }, [fetchNextPage, observerElem]);

    let rowFiles: any[] = [];
    if (activityLog) {
        rowFiles = stableSort(activityLog.pages.flat(), getComparator(order, orderBy)).map((file: any, index) => {
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
                    onKeyDown={(event) => handleKeyDown(event, activityLog.pages.flat(), selectedFiles, dispatch)}
                    onDoubleClick={(event) => handleDoubleClick(event, file, history, dispatch)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={file.fsObjectId}
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
    }

    // Old files array
    const rowFilesTest = stableSort(filesArray.slice(0, 22), getComparator(order, orderBy)).map((file: any, index) => {
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
                key={file.fsObjectId}
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

    return (
        <Box sx={{ width: '100%', height: '100%' }} onContextMenu={backgroundMainMenuClick}>
            <Paper elevation={0} sx={{ mb: 2 }} onContextMenu={tableRowRightClick}>
                <TableContainer
                    // onScroll={onScroll}
                    sx={{
                        maxHeight: '87vh',
                        '&::-webkit-scrollbar': {
                            height: '16px',
                            overflow: 'visible',
                            width: '16px',
                        },
                        '&::-webkit-scrollbar-button': {
                            height: 0,
                            width: 0,
                        },
                        '&::-webkit-scrollbar-corner': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.2)',
                            backgroundClip: 'padding-box',
                            border: 'solid transparent',
                            borderWidth: '1px 6px 1px 1px',
                            minHeight: '28px',
                            padding: '100px 0 0',
                            '-webkit-box-shadow': 'inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)',
                            boxShadow: 'inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundClip: 'padding-box',
                            border: 'solid transparent',
                            borderWidth: '0 4px 0 0',
                        },
                    }}
                >
                    <Table stickyHeader>
                        <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        {isSuccess && <TableBody>{rowFiles}</TableBody>}
                    </Table>
                    <div ref={observerElem} className="loader">
                        {isFetchingNextPage && hasNextPage ? 'Loading...' : ''}
                    </div>
                </TableContainer>
                <ContextMenu page="MyDrive" />
            </Paper>
            <BackgroundMainMenu handleClose={closeBackgroundMainMenu} showMenu={backgroundMenu} />
        </Box>
    );
};

export default MyDriveInfinitiScrollTable;
