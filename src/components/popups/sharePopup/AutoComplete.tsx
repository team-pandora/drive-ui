import * as React from "react";
import {
  styled,
  Box,
  Autocomplete,
  Avatar,
  Typography,
  List,
  Grid,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import i18next from "i18next";
import { getSharedUsers } from "../../../api/users";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../../store/users";

const AutoCompleteStyle = {
  width: "600px",
  ".MuiAutocomplete-tag": {
    direction: "ltr",
  },
  display: "flex",
  alignItems: "center",
  ".MuiFilledInput-root": {
    padding: "0px",
  },
  ".MuiFilledInput-input": {
    height: "40px",
  },
  //   backgroundColor: "pink",
};

const UserAutoComplete = () => {
  const dispatch = useDispatch();
  const dir = i18next.dir(i18next.language);
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const selectedUsers = useSelector((state: any) => state.users.users);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 1) {
      setValue(event.target.value);
      const users = await getSharedUsers();
      users[0].fullName = "רוני גז";
      users[0].hierarchy = "רוני גז חושבת שהיא צודקת/יסודות/טמטום/חיים תותים";
      users[1].fullName = "מאיה פישר";
      setUsers(users);
    }
  };

  return (
    <Autocomplete
      sx={{
        width: "600px",
        ".MuiAutocomplete-tag": {
          direction: "ltr",
        },
        display: "flex",
        alignItems: "center",
        ".MuiFilledInput-root": {
          padding: "0px",
        },
        ".MuiFilledInput-input": {
          height: "40px",
        },
      }}
      multiple
      id="multiple-limit-tags"
      //   limitTags={2}
      options={users.map((user: any) => user)}
      freeSolo
      onChange={(event: any, newValue: any) => {
        console.log("newValue", newValue);
          dispatch(usersActions.setUsers(newValue));
      }}
      renderOption={(props, options, { selected }) => {
        return (
          <li {...props}>
            <Box dir={dir} sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={2}>
                  <Avatar
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body2">{options.fullName}</Typography>
                  <span color="lightgrey">{options.hierarchy}</span>
                </Grid>
              </Grid>
            </Box>
          </li>
        );
      }}
      renderTags={(value: any[], getTagProps) => {
        dispatch(usersActions.setUsers(value));
        return value.map((option: any, index: number) => {
          return (
            <Chip
              variant="outlined"
              label={option.fullName}
              {...getTagProps({ index })}
            />
          );
        });
      }}
      getOptionLabel={(option) => option.fullName}
      renderInput={(params) => (
        <TextField
          onChange={handleChange}
          {...params}
          variant="filled"
          placeholder={i18next.t("search.SearchUsers")}
        />
      )}
    />
  );
};

export default UserAutoComplete;
