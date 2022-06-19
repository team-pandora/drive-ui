import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import i18next from 'i18next';
import { RecentI } from '../../../data/fakedata';

interface HeadCell {
    disablePadding: boolean;
    id: keyof RecentI;
    label: string;
    numeric: boolean;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RecentI) => void;
    order: Order;
    orderBy: string;
}

function TableHeader(props: EnhancedTableProps) {
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
            id: 'size',
            numeric: false,
            disablePadding: false,
            label: `${i18next.t('tableHeader.Size')}`,
        },
    ];

    const dir = i18next.dir(i18next.language) === 'rtl';

    headCells.forEach((cell) => {
        // TODO:
        // cell.numeric = dir;
    });

    const { order, orderBy } = props;

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
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
