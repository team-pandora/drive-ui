import React, { useEffect, useState } from "react";
import { Box, Table, Paper, TableBody, TableCell, TableContainer, TablePagination, Avatar, TableRow} from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TableHeader from "../tableHeaders/SharedHeader";
import { SharedI } from "../../data/fakedata";
import { getComparator, stableSort } from '../../utils/sortFunctions';
// import ContextMenu from "../components/ContextMenu";

type Order = "asc" | "desc";

const SharedTable: React.FC<{ filesArray: any[] }> = (props) => {
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "left" : "right";


  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof SharedI>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 12;
  const history = useHistory();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SharedI
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleMouseClick = (event: React.MouseEvent<unknown>, name: string) => {
    // on right click open the component
    if (event.button === 2) {
      event.preventDefault();
      setShowContextMenu(true);
      setPosition({ x: event.pageX, y: event.pageY });
    }
    if (event.ctrlKey) handleClick(name);
    else setSelected([name]);
  };

  const handleSelectAllClick = (event: any, name: string) => {
    if (event.key === "a" && event.ctrlKey) {
      event.preventDefault();
      const allRowsNames = props.filesArray.map((n) => n.name);
      setSelected(allRowsNames);
    }
  };

  const handleDoubleClick = (event: any, id: string) => {
    history.push(`/folder/${id}`);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.filesArray.length) : 0;

  const fileTypeIcon = <FolderIcon sx={{ color: "orange" }} />;
  
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
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      onClick={(event) => handleMouseClick(event, row.name)}
                      onContextMenu={(event) => handleMouseClick(event, row.name)}
                      onKeyDown={(event) =>
                        handleSelectAllClick(event, row.name)
                      }
                      onDoubleClick={(event) =>
                        handleDoubleClick(event, row.name)
                      }
                    >
                      <TableCell padding="checkbox">{fileTypeIcon}</TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        // padding="none"
                        sx={{
                          width: "60%",
                        }}
                        align={dir}
                      >
                        {row.name}
                      </TableCell>
                      
                      <TableCell sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }} align={dir}>
                        {'user name'}
                        <Avatar sx={{
                          width: "25px",
                          height: "25px",
                          marginLeft: "10px",
                        }}/>
                        </TableCell>
                      <TableCell sx={{
                        width: "15%",
                      }} align={dir}>{row.stateCreatedAt}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        dir={'ltr'}
        rowsPerPageOptions={[]}
        component="div"
        count={props.filesArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      {/* {showContextMenu && <ContextMenu show={showContextMenu} posx={position.x} posy={position.y}  />} */}
    </Box>
  );
}

export default SharedTable;
