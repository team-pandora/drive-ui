import React, { useEffect } from "react";
import {
  Box,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../tableHeaders/MyDriveHeader";
import { MyDriveI } from "../../data/fakedata";
import { getComparator, stableSort } from "../../utils/sortFunctions";
import { filesActions } from "../../store/files";
import { uiActions } from "../../store/ui";
import ContextMenu from "../ContextMenu";
import FileType from "../FileType";
import { useHistory } from "react-router-dom";

type Order = "asc" | "desc";

const MyDriveTable: React.FC<{ filesArray: any[] }> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "left" : "right";
  const selectedFiles = useSelector((state: any) => state.files.files);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof MyDriveI>("owner");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 12;

  const fileicon = FileType("folder");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof MyDriveI
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleScroll = () => {
    console.log("scrolling");
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDoubleClick = (event: any, file: any) => {
    history.push(`/folder/${file.fsObjectId}`);
    dispatch(filesActions.setFiles([]));
  };

  const isSelected = (file: any) => {
    return selectedFiles.indexOf(file.stateId) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.filesArray.length)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
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

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      onContextMenu={(event) =>
                        handleContextMenuClick(event, row)
                      }
                      onKeyDown={(event) => handleSelectAllClick(event)}
                      onDoubleClick={(event) => handleDoubleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">{fileicon}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        // padding="none"
                        sx={{
                          width: "45%",
                        }}
                        align={dir}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ width: "20%" }} align={dir}>
                        {"אני"}
                      </TableCell>
                      <TableCell align={dir}>{row.fsObjectUpdatedAt}</TableCell>
                      <TableCell sx={{ width: "8%" }} align={dir}>
                        {row.size ? row.size : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ContextMenu />
      <TablePagination
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        dir={"ltr"}
        rowsPerPageOptions={[]}
        component="div"
        count={props.filesArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default MyDriveTable;
