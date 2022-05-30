import React from "react";
import { Box, styled, List } from "@mui/material";
import NavButton from "./NavButton";
import ExternalButton from "./ExternalButton";
import IncomingFilesButton from "./IncomingFilesButton";
import {
  Home,
  StarBorder,
  QueryBuilder,
  Delete,
  PeopleAlt,
  MoveToInbox,
  CallMissedOutgoing,
} from "@mui/icons-material";
import i18next from "i18next";

const ButtonsBox = styled(Box)({
  maxHeight: "700px",
  borderBottom: "solid 1px lightgray",
});

const PagesButtons = () => {
  const [incomingButtons, setIncomingButtons] = React.useState(false);
  const [outgoingButtons, setOutgoingButtons] = React.useState(false);

  const incomingExternalTabs = () => {
    setIncomingButtons(!incomingButtons);
    setOutgoingButtons(false);
  };
  const outgoingExternalTabs = () => {
    setOutgoingButtons(!outgoingButtons);
    setIncomingButtons(false);
  };

  return (
    <ButtonsBox>
      <List>
        <NavButton
          path="my-drive"
          label={i18next.t("sideBar.myDrive")}
          icon={<Home />}
        />
        <NavButton
          path="shared"
          label={i18next.t("sideBar.SharedWithMe")}
          icon={<PeopleAlt />}
        />
        <NavButton
          path="recently"
          label={i18next.t("sideBar.Recently")}
          icon={<QueryBuilder />}
        />
        <NavButton
          path="favorites"
          label={i18next.t("sideBar.Favorites")}
          icon={<StarBorder />}
        />
        <NavButton
          path="trash"
          label={i18next.t("sideBar.Trash")}
          icon={<Delete />}
        />
        <IncomingFilesButton
          path="external-transferred"
          label={i18next.t("sideBar.ExternalTransferIncoming")}
          icon={<MoveToInbox />}
          isOpen={incomingButtons}
          onArrowClick={incomingExternalTabs}
        />
        {incomingButtons && (
          <NavButton
            path="external-transferred-dropbox"
            label={i18next.t("sideBar.IncomingFromTomcal")}
            icon={null}
          />
        )}
        {incomingButtons && (
          <NavButton
            path="external-transferred-cargo"
            label={i18next.t("sideBar.IncomingFromCargo")}
            icon={null}
          />
        )}
        <ExternalButton
          path="statusTransferred"
          label={i18next.t("sideBar.StatusFilesSent")}
          icon={<CallMissedOutgoing />}
          onArrowClick={outgoingExternalTabs}
          isOpen={outgoingButtons}
        />
        {outgoingButtons && (
          <NavButton
            path="/2"
            label={i18next.t("sideBar.OutgoingApprovalFromTomcal")}
            icon={null}
          />
        )}
        {outgoingButtons && (
          <NavButton
            path="/1"
            label={i18next.t("sideBar.OutgoingApprovalFromCargo")}
            icon={null}
          />
        )}
      </List>
    </ButtonsBox>
  );
};

export default PagesButtons;
