import React, { useState } from "react";
import Navbar from "./components/layout/toolBar/ToolBar";
import Sidebar from "./components/layout/sideNav/Sidebar";
import { Route, Switch, Redirect } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MyDrive from "./pages/MyDrive";
import Shared from "./pages/Shared";
import Recently from "./pages/Recently";
import Favorites from "./pages/Favorites";
import Trash from './pages/Trash';
import Quota from "./pages/Quota";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function App() {  
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "ltr" : "rtl";
  
  return (

    <Box dir={dir}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Sidebar />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/my-drive' />
          </Route>
          <Route path='/my-drive' exact>
            <MyDrive />
          </Route>
          <Route path='/folder/:folderId' exact>
            <MyDrive />
          </Route>
          <Route path='/file?folderId' exact>
            <MyDrive />
          </Route>
          <Route path='/shared'>
            <Shared />
          </Route>
          <Route path='/recently'>
            <Recently />
          </Route>
          <Route path='/favorites'>
            <Favorites />
          </Route>
          <Route path='/trash'>
            <Trash />
          </Route>
          <Route path='/quota'>
            <Quota />
          </Route>
        </Switch>
      </Stack>
    </Box>
  );
}

export default App;
