import React, { Fragment } from "react";
import {
  Button,
  styled,
  Box,
  MenuItem,
  Menu,
  Paper,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuList,
} from "@mui/material";
import {
  Add,
  CreateNewFolderOutlined,
  Check,
  Article,
  UploadFile,
  DriveFolderUpload,
} from "@mui/icons-material";
// import MainMenu from "../MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";

const ButtonDiv = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  height: "70px",
}));

const ButtonStyled = styled(Button)({
  width: "120px",
  height: "45px",
  marginLeft: "10px",
  marginRight: "10px",
  color: "black",
  backgroundColor: "white",
  borderRadius: "20px",
  ":hover": { backgroundColor: "rgba(0,0,0,.04)" },
});

const AddButton = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state: any) => state.ui.mainMenuIsVisible);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {

  };

  const handleClose = () => {

  };

  return (
    <Fragment>
      <ButtonDiv>
        <ButtonStyled
          onClick={handleClick}
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          New
        </ButtonStyled>
      
      </ButtonDiv>
    </Fragment>
  );
};

export default AddButton;
