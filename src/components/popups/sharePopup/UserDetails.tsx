import React from "react";
import { styled, ListItemText, Box, Typography } from "@mui/material";
import i18next from "i18next";
import UserAvatar from "../../layout/Avatar";
import PermissionMenu from "./permissions/PermissionMenu";

const UserTab = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const UserDetail: React.FC<{
  user: { permission: string; fullName: string; mail: string; color: string };
}> = (props) => {
  const dir = i18next.dir(i18next.language);

  return (
    <UserTab sx={{ direction: dir }}>
      <UserAvatar name={props.user.fullName} color={props.user.color} />
      <ListItemText sx={{}}>
        <Typography variant="body2">{props.user.fullName}</Typography>
        <Typography variant="caption">{props.user.mail}</Typography>
      </ListItemText>

      {props.user.permission !== "owner" && (
        <PermissionMenu permission={`${props.user.permission}`} />
      )}

      {props.user.permission === "owner" && (
        <Typography
          sx={{
            margin: "0px 4%",
            color: "lightgrey",
          }}
        >
          {`${i18next.t("buttons.Owner")}`}
        </Typography>
      )}
    </UserTab>
  );
};

export default UserDetail;
