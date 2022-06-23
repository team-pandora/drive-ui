import { HelpOutlineOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Menu, Typography } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';

const Help = () => {
    const dir = i18next.dir(i18next.language);

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

    const arr = [];
    for (let i = 1; i <= 10; i += 1) {
        arr.push(
            <Accordion sx={{ padding: '10px', backgroundColor: '#fff' }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography sx={{ fontWeight: '500' }}>{`${i18next.t(`Help.Questions.Question${i}`)}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{`${i18next.t(`Help.Answers.Answer${i}`)}`}</Typography>
                </AccordionDetails>
            </Accordion>,
        );
    }

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
                {arr}
            </Menu>
        </>
    );
};

export default Help;
