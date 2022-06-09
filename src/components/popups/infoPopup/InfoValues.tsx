import { Box, List, styled, Typography } from "@mui/material";
import UserAvatar from "../../layout/Avatar";

const ValueList = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  alignItems: "center",
  padding: "2vw",
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
      <UserList>
      {props.users.map((user: { name: string; color: string; }) => {
        return (
          <UserAvatar
            // key={user.email}
            name={user.name}
            color={user.color}
          />
        );
      })}
      </UserList>

      {props.isDeleted && <p>12 Oct 2021</p>}
    </ValueList>
  );
};

InfoValues.defaultProps = {
  isDeleted: false
};
