import { PersonAddAlt } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import Owners from './Owners';
import SearchUsers from './SearchUsers';

const AccordionSummaryBox = styled(AccordionSummary)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
});

const SBox = styled(Box)({
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'flex-end',
    marginTop: '40px',
});

const SButton = styled(Button)({
    margin: '0px 1%',
    textTransform: 'none',
});

type props = { isOpen: boolean; handleChange: () => void };

const ShareUsers: React.FC<props> = ({ isOpen, handleChange }) => {
    const dir = i18next.dir(i18next.language);
    const selectedUsers = useSelector((state: any) => state.users.selectedUsers);
    return (
        <Accordion expanded={isOpen} onChange={handleChange} dir={dir}>
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                    height: '80px',
                }}
            >
                <AccordionSummaryBox>
                    <Avatar sx={{ backgroundColor: isOpen ? '#4285f4' : '#9aa0a6' }}>
                        <PersonAddAlt />
                    </Avatar>
                    <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                        {`${i18next.t('messages.SharePopupTitle')}`}
                    </Typography>
                </AccordionSummaryBox>
            </AccordionSummary>

            <AccordionDetails>
                <SearchUsers />
                {selectedUsers.length === 0 && <Owners />}
                {selectedUsers.length > 0 && (
                    <SBox>
                        <SButton variant="text">{`${i18next.t('buttons.Cancel')}`}</SButton>
                        <SButton variant="contained">{`${i18next.t('buttons.Share')}`}</SButton>
                    </SBox>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default ShareUsers;
