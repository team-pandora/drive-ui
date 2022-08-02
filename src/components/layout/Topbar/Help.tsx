import { HelpOutlineOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Menu, Typography } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { answersListEn, answersListHe } from '../../../constants/answers';
import { questionListEn, questionListHe } from '../../../constants/questions';

const Help = () => {
    const dir = i18next.dir(i18next.language);
    const questions = dir === 'ltr' ? questionListEn : questionListHe;
    const answers = dir === 'ltr' ? answersListEn : answersListHe;
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
        setShowSettingsMenu(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowSettingsMenu(true);
    };

    const helpQA = questions.map((question, index) => {
        return (
            <Accordion key={index} dir={dir} sx={{ padding: '10px', backgroundColor: '#fff' }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography sx={{ fontWeight: '500' }}>{question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{answers[index]}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    });

    return (
        <>
            <IconButton onClick={handleClick}>
                <HelpOutlineOutlined sx={{ color: '#5f6368' }} />
            </IconButton>
            <Menu
                dir={dir}
                anchorEl={anchorEl}
                id="settings-menu"
                open={showSettingsMenu}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    style: {
                        width: 400,
                        maxHeight: '550px',
                    },
                }}
                sx={{
                    '& .MuiMenu-list': {
                        paddingTop: '0px',
                        paddingBottom: '0px',
                    },
                }}
            >
                {helpQA}
            </Menu>
        </>
    );
};

export default Help;
