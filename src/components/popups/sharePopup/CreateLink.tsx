import { Box, Button, styled } from '@mui/material';
import i18next from 'i18next';
import { useState } from 'react';
import { EnTimeLimitObject, HeTimeLimitObject } from '../../../constants/index';
import SelectMenus from './SelectMenu';

type props = { handleCreate: (time: string, permission: string) => void };

const SBox = styled(Box)({
    width: '100%',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
});

const MenuItemsBox = styled(Box)({
    width: '340px',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
});

const CreateLink: React.FC<props> = ({ handleCreate }) => {
    const dir = i18next.dir(i18next.language);
    const [timeValue, setTimeValue] = useState<any>();
    const [permission, setPermission] = useState('');

    const permissions = [i18next.t('permissions.Read'), i18next.t('permissions.Write')];
    const timeLimits = dir === 'rtl' ? HeTimeLimitObject : EnTimeLimitObject;

    const selectedTimeLimit = (value: any) => {
        const keyOfOBject = Object.keys(timeLimits).find((key) => timeLimits[key] === value);
        const currentDate = new Date();
        setTimeValue(Math.floor(currentDate.getTime() / 1000) - Number(keyOfOBject));
    };

    const selectedPermission = (value: string) => {
        setPermission(value === i18next.t('permissions.Read') ? 'read' : 'write');
    };

    return (
        <SBox>
            <MenuItemsBox>
                <SelectMenus
                    label={i18next.t('messages.ExpirationTime')}
                    menuItems={dir === 'rtl' ? Object.values(HeTimeLimitObject) : Object.values(EnTimeLimitObject)}
                    selectClick={selectedTimeLimit}
                />
                <SelectMenus
                    label={i18next.t('messages.Permission')}
                    menuItems={permissions}
                    selectClick={selectedPermission}
                />
            </MenuItemsBox>
            <Button
                onClick={() => handleCreate(permission, timeValue)}
                disabled={timeValue === '' || permission === ''}
                sx={{ color: '#4285f4', margin: '0px 1%', textTransform: 'none' }}
            >{`${i18next.t('buttons.CreateLink')}`}</Button>
        </SBox>
    );
};

export default CreateLink;
