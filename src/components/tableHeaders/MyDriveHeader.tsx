import { Box, TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import i18next from 'i18next';
import { MyDriveI } from '../../data/fakedata';
import { sortableHeadCells } from '../../data/myDriveTable';

interface HeadCell {
    disablePadding: boolean;
    id: keyof MyDriveI;
    label: string;
    numeric: boolean;
}

type Order = 'asc' | 'desc';

type props = {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MyDriveI) => void;
    order: Order;
    orderBy: string;
};

const TableHeader: React.FC<props> = ({ onRequestSort, order, orderBy }) => {
    const headCells: readonly HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.Name')}`,
        },
        {
            id: 'owner',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.Owner')}`,
        },
        {
            id: 'fsObjectUpdatedAt',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.LastModified')}`,
        },
        {
            id: 'size',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.Size')}`,
        },
    ];

    const dir = i18next.dir(i18next.language) === 'rtl';

    headCells.forEach((cell) => {
        // TODO: maya
        // cell.numeric = dir;
    });

    const createSortHandler = (property: keyof MyDriveI) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    {/* TODO: render out of return */}
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            {sortableHeadCells.myDrive.includes(headCell.id) && (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    dir="ltr"
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            )}
                            {!sortableHeadCells.myDrive.includes(headCell.id) && headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </>
    );
};

export default TableHeader;
