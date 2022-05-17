import React, { Fragment } from "react";
import {
  Box,
  TableCell,
  TableRow,
  LinearProgress,
  Stack,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useSelector } from "react-redux";
import { sortableheadCells } from "../../data/myDriveTable";
import { MyDriveI } from "../../data/fakedata";
import i18next from "i18next";
interface HeadCell {
  disablePadding: boolean;
  id: keyof MyDriveI;
  label: string;
  numeric: boolean;
}

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof MyDriveI
  ) => void;
  order: Order;
  orderBy: string;
}

function TableHeader(props: EnhancedTableProps) {
  const headCells: readonly HeadCell[] = [
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
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? false : true;

  headCells.forEach((cell) => {
    cell.numeric = dir;
  });

  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof MyDriveI) => (event: React.MouseEvent<unknown>) => {
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
    <Fragment>
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
              {!sortableheadCells.includes(headCell.id) && headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </Fragment>
  );
}

export default TableHeader;
