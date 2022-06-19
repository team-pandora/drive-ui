import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import i18next from 'i18next';
import { SharedI } from '../../../data/fakedata';
import { sortableHeadCells } from '../../../data/myDriveTable';

interface HeadCell {
    disablePadding: boolean;
    id: keyof SharedI;
    label: string;
    numeric: boolean;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SharedI) => void;
    order: Order;
    orderBy: string;
}

function TableHeader(props: EnhancedTableProps) {
    const headCells: readonly HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: `${i18next.t('tableHeader.Name')}`,
        },
        {
            id: 'sharedBy',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.SharedBy')}`,
        },
        {
            id: 'stateCreatedAt',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.ShareDate')}`,
        },
    ];

    const dir = i18next.dir(i18next.language) === 'rtl';

    headCells.forEach((cell) => {
        // TODO:
        // cell.numeric = dir;
    });

    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof SharedI) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {sortableHeadCells.shared.includes(headCell.id) && (
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
                        {!sortableHeadCells.shared.includes(headCell.id) && headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
