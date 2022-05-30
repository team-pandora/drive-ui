import React from "react";
import { styled, InputBase, Box, IconButton } from "@mui/material";
import { width } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import i18next from "i18next";
import { getSharedUsers } from "../../../api/users";
import AutoComplete from './AutoComplete';
import PermissionMenu from "./permissions/PermissionMenu";

const SearchBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,.04)",
  width: "600px",
  height: "50px",
  borderRadius: "10px 10px 0px 0px",
  borderBottom: "2px solid #4285f4",
}));

const PlaceHolder = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: "0 10px",
  width: "100%",
  // backgroundColor: "yellow",
}));

const SearchBar = () => {
  const dir = i18next.dir(i18next.language);
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const selectedUsers = useSelector((state: any) => state.users.users);
  
  
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 1) {
      setValue(event.target.value);
      console.log('here');
      const users = await getSharedUsers();
      setUsers(users);
    }
  };


  return (
    <Box sx={{
      width: "620px",
      height: "50px",
      maxHeight: "200px",
      display: "flex",
      // alignItems: "center",
      justifyContent: "space-between",
    }}>
       <AutoComplete/>
      {selectedUsers.length > 0 && <PermissionMenu permission="maya fisher"/>}
    </Box>
  );
};

export default SearchBar;
