import React from "react";
import { styled, Box } from "@mui/material";

import getRandomColor from "../../../utils/functions";
import UserDetail from "./UserDetails";

const users = [
  {
    name: "מאיה פישר (את/ה)",
    email: "maya.fisher53@gmail.com",
    permission: "owner",
    color: getRandomColor(),
  },
  {
    name: "ירין בניסטי",
    email: "yarin.benisty@gmail.com",
    permission: "read",
    color: getRandomColor(),
  },
  // {
  //   name: "עומר שטרן",
  //   email: "omer.shtern@gmail.com",
  //   permission: "write",
  //   color: getRandomColor(),
  // },
  // {
  //   name: "רוני גז",
  //   email: "roni.gez@gmaOwnersil.com",
  //   permission: "write",
  //   color: getRandomColor(),
  // },
  // {
  //   name: "ליאור פרץ",
  //   email: "lior.horse@gmail.com",
  //   permission: "write",
  //   color: getRandomColor(),
  // },
  // {
  //   name: "גל גבע",
  //   email: "gal.geva@gmail.com",
  //   permission: "write",
  //   color: getRandomColor(),
  // },
  // {
  //   name: "עומר שטרן",
  //   email: "omer.shtern@gmail.com",
  //   permission: "write",
  //   color: getRandomColor(),
  // },
];

const OwnersBox = styled(Box)({
  marginTop: "2.5%",
  maxHeight: "200px",
  overflowY: `${users.length > 5 ? "scroll" : "hidden"}`,
});

const Owners = () => {
  return (
    <OwnersBox>
      {users.map((user) => {
        return (
          <UserDetail
            key={user.email}
            user={{
              fullName: user.name,
              mail: user.email,
              permission: user.permission,
              color: user.color,
            }}
          />
        );
      })}
    </OwnersBox>
  );
};

export default Owners;
