import { ArrowDropDown } from '@mui/icons-material';
import Button from '@mui/material/Button';

const PermissionButton: React.FC<{
    userPermission: string;
    handleClick: any;
}> = (props) => {
    return (
        <Button
            onClick={props.handleClick}
            sx={{
                width: '130px',
                color: 'gray',
                textTransform: 'none',
            }}
        >
            {props.userPermission}
            <ArrowDropDown />
        </Button>
    );
};

export default PermissionButton;
