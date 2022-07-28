import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { OpenPopup } from './components/popups/popupRoute';
import Favorites from './pages/Favorites';
import IncomingCargo from './pages/IncomingCargo';
import IncomingTomcal from './pages/IncomingTomcal';
import MyDrive from './pages/MyDrive';
import Recently from './pages/Recently';
import Shared from './pages/Shared';
import StatusTransferred from './pages/StatusTransferred';
import Storage from './pages/Storage';
import Trash from './pages/Trash';

export const Router: React.FC = () => {
    return (
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
            <Route path="/shared" exact>
                <Shared />
            </Route>
            <Route path="/recently" exact>
                <Recently />
            </Route>
            <Route path="/favorites" exact>
                <Favorites />
            </Route>
            <Route path="/trash" exact>
                <Trash />
            </Route>
            <Route path="/storage" exact>
                <Storage />
            </Route>
            {/* TODO: */}
            <Route path="/external-transferred-dropbox">
                <IncomingTomcal />
            </Route>
            <Route path="/external-transferred-cargo">
                <IncomingCargo />
            </Route>
            <Route path="/statusTransferred">
                <StatusTransferred />
            </Route>
            <Route path="/:fsObjectId/:action">
                <OpenPopup></OpenPopup>
            </Route>
            <Route path="*">
                <Redirect to="/my-drive" />
            </Route>
        </Switch>
    );
};
