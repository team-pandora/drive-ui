import { Check } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

type props = {
    label: string;
    checked: boolean;
    onClick: () => void;
};

export const PermissionType: React.FC<props> = ({ label, checked, onClick }) => {
    return (
        <MenuItem
            sx={{
                padding: '0px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
            }}
            onClick={onClick}
            disableRipple
        >
            <Box
                sx={{
                    width: '30px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {checked && <Check />}
            </Box>
            <Box margin={1}>
                <Typography>{`${label}`}</Typography>
            </Box>
        </MenuItem>
    );
};
