import { useState } from "react";
import { Box, styled, Typography, Button } from "@mui/material";
import i18next from "i18next";
import { InfoProperties } from "./InfoProperties";
import { InfoValues } from "./InfoValues";
import { useDispatch, useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import UserAvatar from "../../layout/Avatar";
import { popupActions } from "../../../store/popups";

const Info = styled(Box)({
  width: "100%",
  height: "100%",
  borderBottom: "solid 1px lightgray",
  backgroundColor: "white",
  display: "flex",
  flexFlow: "column nowrap",
});

const InfoHeader = styled(Box)({
  margin: "2rem",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
});

const InfoBox = styled(Box)({
  display: "flex",
  flexFlow: "row nowrap",
  gap: "6vw",
});

const InfoText = styled(Typography)({
  margin: "0 2vw 0 2vw",
});

const InfoAccess = styled(Box)({
  margin: "8px 2vw 0 2vw",
  display: "flex",
  flexFlow: "row nowrap",

  "& .MuiButtonBase-root": {
    padding: "0 0.3vw 0 0",
  },
});

const FileOwner = styled(Box)({
  "& .MuiButtonBase-root": {
    borderRight: "1px solid rgba(0,0,0,.2)",
    borderRadius: "0",
    paddingRight: "9px",
    marginRight: "8px",
  },
});

const InfoPopup = (props: any) => {
  const dir = i18next.dir(i18next.language);
  const selectedFiles = useSelector((state: any) => state.files.files);  const dispatch = useDispatch();

  return (
    <Info dir={dir}>
      <InfoHeader>
        <Typography>{selectedFiles} - Example</Typography>
        <ImageIcon />
      </InfoHeader>
      <InfoText>Who has access</InfoText>
      <InfoAccess>
        <FileOwner>
          <UserAvatar
            name={props.owner.name}
            color={props.owner.color}
          ></UserAvatar>
        </FileOwner>
        {props.users.map((user: { name: string; color: string }) => {
          return (
            <UserAvatar
              // key={user.email}
              name={user.name}
              color={user.color}
            />
          );
        })}
      </InfoAccess>
      <Button variant="text" sx={{
        height: "32px",
        width: "fit-content",
        textTransform: "none",
        margin: "0.5rem 2vw  2vw"
      }}
      onClick={() => {
        dispatch(popupActions.setInfo());
        dispatch(popupActions.setShare());
      }}>
        Manage access
      </Button>
      <InfoText>File properties</InfoText>
      <InfoBox>
        <InfoProperties></InfoProperties>
        <InfoValues
          type="PNG"
          size="1.5MB"
          owner="Example"
          modified="2020-01-01"
          created="2020-01-01"
          users={[
            { name: "test", color: "blue" },
            { name: "aaa", color: "gray" },
          ]}
        ></InfoValues>
      </InfoBox>
    </Info>
  );
};

InfoPopup.defaultProps = {
  owner: {
    name: "Example owner",
    color: "blue",
  },
  users: [
    { name: "test", color: "blue" },
    { name: "aaa", color: "red" },
    { name: "bbb", color: "blue" },
    { name: "ccc", color: "red" },
    { name: "ddd", color: "cyan" },
  ],
};
export default InfoPopup;
