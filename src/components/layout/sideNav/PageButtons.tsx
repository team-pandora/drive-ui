import {
    CallMissedOutgoing,
    Delete,
    Home,
    MoveToInbox,
    PeopleAlt,
    QueryBuilder,
    StarBorder,
} from '@mui/icons-material';
import { Box, List, styled } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import ExternalButton from './ExternalButton';
import IncomingFilesButton from './IncomingFilesButton';
import NavButton from './NavButton';

const SBox = styled(Box)({
    maxHeight: '700px',
    borderBottom: 'solid 1px lightgray',
});

const PagesButtons = () => {
    // const [incomingButtons, setIncomingButtons] = useState(false);
    // const [outgoingButtons, setOutgoingButtons] = useState(false);

    // const incomingExternalTabs = () => {
    //     setIncomingButtons(!incomingButtons);
    //     setOutgoingButtons(false);
    // };
    // const outgoingExternalTabs = () => {
    //     setOutgoingButtons(!outgoingButtons);
    //     setIncomingButtons(false);
    // };

    return (
        <SBox>
            <List onDragStart={(event) => event.preventDefault()}>
                <NavButton path="my-drive" label={i18next.t('sideBar.myDrive')}>
                    <Home />
                </NavButton>
                <NavButton path="shared" label={i18next.t('sideBar.SharedWithMe')}>
                    {<PeopleAlt />}
                </NavButton>
                <NavButton path="recently" label={i18next.t('sideBar.Recently')}>
                    {<QueryBuilder />}
                </NavButton>
                <NavButton path="favorites" label={i18next.t('sideBar.Favorites')}>
                    {<StarBorder />}
                </NavButton>
                <NavButton path="trash" label={i18next.t('sideBar.Trash')}>
                    {<Delete />}
                </NavButton>
                {/* <IncomingFilesButton
                    path="external-transferred"
                    label={i18next.t('sideBar.ExternalTransferIncoming')}
                    icon={<MoveToInbox />}
                    isOpen={incomingButtons}
                    onArrowClick={incomingExternalTabs}
                />
                {incomingButtons && (
                    <NavButton
                        path="external-transferred-dropbox"
                        label={i18next.t('sideBar.IncomingFromTomcal')}
                        icon={null}
                    />
                )}
                {incomingButtons && (
                    <NavButton
                        path="external-transferred-cargo"
                        label={i18next.t('sideBar.IncomingFromCargo')}
                        icon={null}
                    />
                )}
                <ExternalButton
                    path="statusTransferred"
                    label={i18next.t('sideBar.StatusFilesSent')}
                    icon={<CallMissedOutgoing />}
                    onArrowClick={outgoingExternalTabs}
                    isOpen={outgoingButtons}
                />
                {outgoingButtons && (
                    <NavButton path="/2" label={i18next.t('sideBar.OutgoingApprovalFromTomcal')} icon={null} />
                )}
                {outgoingButtons && (
                    <NavButton path="/1" label={i18next.t('sideBar.OutgoingApprovalFromCargo')} icon={null} />
                )} */}
            </List>
        </SBox>
    );
};

export default PagesButtons;
