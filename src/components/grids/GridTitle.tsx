import { Box, styled, Typography } from '@mui/material';

const SBox = styled(Box)({
    width: '100%',
    height: '25%',
    display: 'flex',
    alignItems: 'center',
});

type props = {
    fileName: string;
    icon: JSX.Element | undefined;
};

const GridTitle: React.FC<props> = ({ fileName, icon }) => {
    return (
        <SBox>
            {icon}
            <Typography sx={{ fontSize: 12 }}>{fileName}</Typography>
        </SBox>
    );
};

export default GridTitle;
