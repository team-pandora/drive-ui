import React, { Fragment } from "react";
import { Button, styled, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from '../../store/ui'
import MainMenuAll from "../MainMenuAll";
import i18next from "i18next";

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
  textTransform: "none",
  ":hover": { backgroundColor: "rgba(0,0,0,.04)" },
  display: "flex",
  justifyContent: "space-between",
});

const AddButton = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const showMenu = useSelector((state: any) => state.ui.mainMenuIsVisible);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(uiActions.toggleMainMenu());
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(uiActions.toggleMainMenu());
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <ButtonDiv>
        <ButtonStyled onClick={handleClick} variant="contained" size="large">
        {`${i18next.t("buttons.New")}`}
        <Add sx={{ color: "#f77f00", fontSize: 35 }}  />
        </ButtonStyled>
      <MainMenuAll anchorEl={anchorEl} showMenu={showMenu} handleClose={handleClose}/>
      </ButtonDiv>

    </Fragment>
  );
};

export default AddButton;
