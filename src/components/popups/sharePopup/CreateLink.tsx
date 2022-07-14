import { Box, Button } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import SelectMenus from './SelectMenu';

type props = { handleCreate: (event: any, time: string, permission: string) => void };

const CreateLink: React.FC<props> = ({ handleCreate }) => {
    const [timeValue, setTimeValue] = useState('');
    const [permission, setPermission] = useState('');

    // const timeLimit = ['5 min', '15 min', '30 hr', '1 hr', '1.5 hr'];
    const timeLimit = [`5 דק'`, `15 דק'`, `30 דק'`, `1 ש'`, `1.5 ש'`];
    const permissions = [i18next.t('permissions.Read'), i18next.t('permissions.Write')];

    const selectedTimeLimit = (value: string) => {
        setTimeValue(value);
    };

    const selectedPermission = (value: string) => {
        setPermission(value);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '40px',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    width: '340px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <SelectMenus
                    label={i18next.t('messages.ExpirationTime')}
                    menuItems={timeLimit}
                    selectClick={selectedTimeLimit}
                />
                <SelectMenus
                    label={i18next.t('messages.Permission')}
                    menuItems={permissions}
                    selectClick={selectedPermission}
                />
            </Box>
            <Button
                onClick={(event) => handleCreate(event, timeValue, permission)}
                disabled={timeValue === '' || permission === ''}
                sx={{ color: '#4285f4', margin: '0px 1%', textTransform: 'none' }}
            >{`${i18next.t('buttons.CreateLink')}`}</Button>
        </Box>
    );
};

export default CreateLink;
