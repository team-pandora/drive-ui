import { Box, List, styled, Typography } from "@mui/material";
import UserAvatar from "../../layout/Avatar";

const ValueList = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  alignItems: "left",
  padding: "1rem 2vw 1rem",
});

const UserList = styled(List)({
  display: "flex",
  flexFlow: "row nowrap",
  textTransform: "none",
  marginTop: "-20px",
});

export const InfoValues = (props: any) => {
  return (
    <ValueList>
      <Typography>{props.type}</Typography>
      <Typography>{props.size}</Typography>
      <Typography>{props.owner}</Typography>
      <Typography>{props.modified}</Typography>
      <Typography>{props.created}</Typography>
      {props.isDeleted && <p>12 Oct 2021</p>}
    </ValueList>
  );
};

InfoValues.defaultProps = {
  isDeleted: false
};
