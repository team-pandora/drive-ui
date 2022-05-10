import React from "react";
import {
  Box,
  styled,
  List,
} from "@mui/material";

import MyDriveButton from './navButtons/MyDriveButton';
import SharedButton from './navButtons/SharedButton';
import RecentlyButton from './navButtons/RecentlyButton';
import FavoritesButton from './navButtons/FavoritesButton';
import TrashButton from './navButtons/TrashButton';

const Buttons = styled(Box)({
  height: "260px",
  borderBottom: "solid 1px lightgray",
});

const PagesButtons = () => {
  return (
    <Buttons>
      <List>
        <MyDriveButton />
        <SharedButton />
        <RecentlyButton />
        <FavoritesButton />
        <TrashButton />
      </List>
    </Buttons>
  );
};

export default PagesButtons;
