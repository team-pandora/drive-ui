export const fetchNum = 15;
export const Permissions = {
    read: 'read',
    write: 'write',
    owner: 'owner',
    removeAccess: 'removeAccess',
    ownership: 'ownership',
};

export const EnTimeLimitObject: any = {
    300: '5 min',
    900: '15 min',
    1800: '30 hr',
    3600: '1 hr',
    5400: '1.5 hr',
};

export const HeTimeLimitObject: any = {
    300: '5 דק',
    900: '15 דק',
    1800: '30 דק',
    3600: '1 ש',
    5400: '1.5 ש',
};

export const scrollStyle = {
    maxHeight: '87vh',
    '&::-webkit-scrollbar': {
        height: '16px',
        overflow: 'visible',
        width: '16px',
    },
    '&::-webkit-scrollbar-button': {
        height: 0,
        width: 0,
    },
    '&::-webkit-scrollbar-corner': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        backgroundClip: 'padding-box',
        border: 'solid transparent',
        borderWidth: '1px 6px 1px 1px',
        minHeight: '28px',
        padding: '100px 0 0',
        '-webkit-box-shadow': 'inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)',
        boxShadow: 'inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%)',
    },
    '&::-webkit-scrollbar-track': {
        backgroundClip: 'padding-box',
        border: 'solid transparent',
        borderWidth: '0 4px 0 0',
    },
};
