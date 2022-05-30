import React from "react";
import Box from "@mui/material/Box";
import i18next from "i18next";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { sortableHeadCells } from "../../data/myDriveTable";
import { FavoritesI } from "../../data/fakedata";

interface HeadCell {
  disablePadding: boolean;
  id: keyof FavoritesI;
  label: string;
  numeric: boolean;
}

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof FavoritesI
  ) => void;
  order: Order;
  orderBy: string;
}

function TableHeader(props: EnhancedTableProps) {
  const headCells: HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: `${i18next.t("tableHeader.Name")}`,
    },
    {
      id: "owner",
      numeric: false,
      disablePadding: false,
      label: `${i18next.t("tableHeader.Owner")}`,
    },
    {
      id: "fsObjectUpdatedAt",
      numeric: false,
      disablePadding: false,
      label: `${i18next.t("tableHeader.LastModified")}`,
    },
    {
      id: "size",
      numeric: false,
      disablePadding: false,
      label: `${i18next.t("tableHeader.Size")}`,
    },
  ];

  const dir = i18next.dir(i18next.language) === "rtl" ? true : false;

  headCells.forEach((cell) => {
    cell.numeric = dir;
  });

  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof FavoritesI) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {sortableHeadCells.starred.includes(headCell.id) && (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  dir="ltr"
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
              {!sortableHeadCells.starred.includes(headCell.id) && headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
