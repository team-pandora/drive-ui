import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui";
import Navbar from "./components/layout/toolBar/ToolBar";
import Sidebar from "./components/layout/sideNav/Sidebar";
import MyDrive from "./pages/MyDrive";
import Shared from "./pages/Shared";
import Recently from "./pages/Recently";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import Quota from "./pages/Quota";
import IncomingTomcal from "./pages/IncomingTomcal";
import IncomingCargo from "./pages/IncomingCargo";
import StatusTransferred from "./pages/StatusTransferred";
import cookies from "js-cookie";
import i18next from "i18next";

function App() {
  const dispatch = useDispatch();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();
  dispatch(uiActions.setLanguage(currentLanguageCode));
  const dir = i18next.dir(i18next.language);
  console.log(dir);
  
  

  return (
    <Box dir={dir}>
      <Navbar />
      <Stack direction="row" justifyContent="space-evenly">
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/my-drive" />
          </Route>
          <Route path="/my-drive" exact>
            <MyDrive />
          </Route>
          <Route path="/folder/:folderId" exact>
            <MyDrive />
          </Route>
          <Route path="/file?folderId" exact>
            <MyDrive />
          </Route>
          <Route path="/shared" exact>
            <Shared />
          </Route>
          <Route path="/recently" exact>
            <Recently />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/trash">
            <Trash />
          </Route>
          <Route path="/quota">
            <Quota />
          </Route>
          <Route path="/external-transferred-dropbox">
            <IncomingTomcal />
          </Route>
          <Route path="/external-transferred-cargo">
            <IncomingCargo />
          </Route>
          <Route path="/statusTransferred">
            <StatusTransferred />
          </Route>
        </Switch>
      </Stack>
    </Box>
  );
}

export default App;
