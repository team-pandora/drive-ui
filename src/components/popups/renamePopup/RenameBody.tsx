import React, { useEffect, useRef } from "react";
import { Box, TextField, Button, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import { RenameFile } from "../../../api/files";
import i18next from "i18next";
import { uiActions } from "../../../store/ui";

const RenameBodyBox = styled(Box)({
  height: "100px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "0 15px",
});

const RenameBody = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("file name");
  const selectedFiles = useSelector((state: any) => state.files.files);
  const textRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onRenameSubmit = async () => {
    await RenameFile(selectedFiles[0], value);
    dispatch(popupActions.setRename());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onCancel = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(popupActions.setRename());
  };

  useEffect(() => {    
    if (textRef.current) {
      textRef.current.focus();
      textRef.current.select();
    }
  }
  , [textRef]);

  return (
    <RenameBodyBox>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={1}
        value={value}
        onChange={handleChange}
        inputRef={textRef}
        size="small"
        sx={{
          width: "460px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          margin: "0 10px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="text"
          sx={{ margin: "0px 1%", textTransform: "none" }}
          onClick={onCancel}
        >{`${i18next.t("buttons.Cancel")}`}</Button>
        <Button
          onClick={onRenameSubmit}
          variant="contained"
          disabled={value === ""}
          sx={{ margin: "0px 1%", textTransform: "none" }}
        >{`${i18next.t("buttons.Finish")}`}</Button>
      </Box>
    </RenameBodyBox>
  );
};

export default RenameBody;
