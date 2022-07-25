import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

type props = { onClick?: (event?: any) => void; text: string; children: React.ReactNode };

const Button: React.FC<props> = ({ onClick, text, children }) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>{children}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </MenuItem>
    );
};

export default Button;
