import * as React from "react";
import {
  Box,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../tableHeaders/FavoritesHeader";
import { getComparator, stableSort } from "../../utils/sortFunctions";
import { filesActions } from "../../store/files";
import { uiActions } from "../../store/ui";
import ContextMenu from "../contextMenu/ContextMenu";
import FileType from "../FileType";
import { FavoritesI } from "../../data/fakedata";
import i18next from "i18next";
import { ISOStringToDateString } from "../../utils/functions";

type Order = "asc" | "desc";

const IncomingTomcalTable: React.FC<{ filesArray: any[] }> = (props) => {
  const dispatch = useDispatch();
  const dir = i18next.dir(i18next.language) === "rtl" ? "right" : "left";
  const locales = i18next.dir(i18next.language) === "ltr" ? "en-US" : "he-IL";
  const selectedFiles = useSelector((state: any) => state.files.files);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof FavoritesI>("owner");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 100;

  const fileIcon = FileType("folder");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof FavoritesI
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, file: any) => {
    const selectedIndex = selectedFiles.indexOf(file.stateId);
    let newSelected: readonly string[] = [];

    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedFiles, file.stateId);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedFiles.slice(1));
      } else if (selectedIndex === selectedFiles.length - 1) {
        newSelected = newSelected.concat(selectedFiles.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedFiles.slice(0, selectedIndex),
          selectedFiles.slice(selectedIndex + 1)
        );
      }

      dispatch(filesActions.setFiles(newSelected));
    } else {
      dispatch(filesActions.setFiles([file.stateId]));
    }
  };

  const handleSelectAllClick = (event: any) => {
    if (event.key === "a" && event.ctrlKey) {
      event.preventDefault();
      const allRowsNames = props.filesArray.map((n) => n.stateId);
      dispatch(filesActions.setFiles(allRowsNames));
    }
  };

  const handleContextMenuClick = (
    event: React.MouseEvent<unknown>,
    file: any
  ) => {
    event.preventDefault();
    if (selectedFiles.length <= 1) {
      dispatch(filesActions.setFiles([file.stateId]));
    }
    dispatch(uiActions.setContextMenu());
    dispatch(
      uiActions.setContextMenuPosition({ x: event.clientX, y: event.clientY })
    );
  };

  const isSelected = (file: any) => {
    return selectedFiles.indexOf(file.stateId) !== -1;
  };

  return (
    <Box>
      <Paper elevation={0}>
        <TableContainer
          sx={{
            maxHeight: 800,
          }}
        >
          <Table stickyHeader>
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(props.filesArray, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const stringDate = ISOStringToDateString(
                    row.fsObjectUpdatedAt,
                    locales
                  );
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      onContextMenu={(event) =>
                        handleContextMenuClick(event, row)
                      }
                      onKeyDown={(event) => handleSelectAllClick(event)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {FileType("folder")}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{
                          width: "45%",
                        }}
                        align={dir}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ width: "20%" }} align={dir}>
                        {row.owner}
                      </TableCell>
                      <TableCell align={dir}>{stringDate}</TableCell>
                      <TableCell sx={{ width: "8%" }} align={dir}>
                        {row.size ? row.size : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ContextMenu />
    </Box>
  );
};

export default IncomingTomcalTable;
