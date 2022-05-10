import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useSelector } from "react-redux";
import { sortableheadCells } from "../../data/myDriveTable";
import { TrashI } from "../../data/fakedata";

interface HeadCell {
    disablePadding: boolean;
    id: keyof TrashI;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: 'שם',
    },
    {
      id: "owner",
      numeric: false,
      disablePadding: false,
      label: 'בעלים',
    },
    {
      id: "fsObjectUpdatedAt",
      numeric: false,
      disablePadding: false,
      label: `תאריך ההעברה לאשפה`,
    },
    {
      id: "size",
      numeric: false,
      disablePadding: false,
      label: `גודל הקובץ`,
    },
];


type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TrashI
  ) => void;
  order: Order;
  orderBy: string;
}

function TableHeader(props: EnhancedTableProps) {
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? false : true;

  headCells.forEach((cell) => {
    cell.numeric = dir;
  });

  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TrashI) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };


  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const xPos = event.pageX + "px";
      const yPos = event.pageY + "px";
    });
  };

  return (
    <TableHead
      sx={{ backgroundColor: "white" }}
      onClick={(event) => handleClick(event, "name")}
    >
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {sortableheadCells.includes(headCell.id) && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                dir='ltr'
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
            {!sortableheadCells.includes(headCell.id) && headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
