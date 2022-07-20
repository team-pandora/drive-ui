import { Link, PriorityHigh } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    InputBase,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleErrorMsg } from '../../../api/error';
import { generateShareLink } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import CreateLink from './CreateLink';

const AccordionSummaryBox = styled(AccordionSummary)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
});

const SLinkBox = styled(Box)({
    display: 'flex',
    width: '100%',
    height: '70px',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

const WarningMessage = styled(Typography)({
    width: '560px',
    height: '30px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#800080',
});

type props = { isOpen: boolean; handleChange: () => void };

const ShareLink: React.FC<props> = ({ isOpen, handleChange }) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const handleFocus = (event: any) => {
        // TODO: add copy to clipboard
        event.target.select();
    };

    const selectedFiles = useSelector((state: any) => state.files.selected);

    const [link, setLink] = useState('');

    const handleCreate = async (permission: string, time: any) => {
        const { fsObjectId } = selectedFiles[0];
        generateShareLink(fsObjectId, permission, time)
            .then((res) => {
                setLink(`localhost/api/users/fs/${fsObjectId}/permission/token?token=${res.data.token}`);
            })
            .catch(handleErrorMsg('Failed creating link', window.location.pathname.slice(1)));
    };

    const handleFinish = () => {
        dispatch(popupActions.setShare());
    };

    return (
        <Accordion expanded={!isOpen} onChange={handleChange} dir={dir}>
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                    height: '80px',
                }}
            >
                <AccordionSummaryBox>
                    <Avatar sx={{ backgroundColor: isOpen ? '#9aa0a6' : '#4285f4' }}>
                        <Link />
                    </Avatar>
                    <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                        {`${i18next.t('messages.ShareByLinkTitle')}`}
                    </Typography>
                </AccordionSummaryBox>
            </AccordionSummary>

            <AccordionDetails>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <CreateLink handleCreate={handleCreate} />
                        {link !== '' && (
                            <>
                                <SLinkBox>
                                    <WarningMessage>
                                        <PriorityHigh sx={{ margin: '10px', color: '#800080' }} />
                                        {`${i18next.t('alerts.ShareLinkWarning')}`}
                                    </WarningMessage>
                                    <InputBase
                                        style={{
                                            width: '90%',
                                            height: '30px',
                                            backgroundColor: '#f5f5f5',
                                        }}
                                        type="text"
                                        readOnly
                                        onFocus={handleFocus}
                                        value={link}
                                    />
                                </SLinkBox>
                            </>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={0} justifyContent="flex-end">
                        <Button
                            variant="contained"
                            onClick={handleFinish}
                            sx={{ margin: '0px 1%', textTransform: 'none' }}
                        >{`${i18next.t('buttons.Finish')}`}</Button>
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShareLink;
