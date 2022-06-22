import { ArrowDropDown } from '@mui/icons-material';
import Button from '@mui/material/Button';

type props = {
    userPermission: string;
    handleClick: any;
};

export const PermissionButton: React.FC<props> = ({ userPermission, handleClick }) => {
    return (
        <Button
            onClick={handleClick}
            sx={{
                width: '130px',
                color: 'gray',
                textTransform: 'none',
            }}
        >
            {userPermission}
            <ArrowDropDown />
        </Button>
    );
};
