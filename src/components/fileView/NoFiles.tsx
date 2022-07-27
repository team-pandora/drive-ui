import { Box, styled, Typography } from '@mui/material';

type props = {
    message: string;
    subMessage: string;
    children: any;
};

const SBox = styled(Box)({
    width: '430px',
    height: '430px',
    backgroundColor: 'rgba(0,0,0,.04)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const SMessageBox = styled(Box)({
    width: '350px',
    height: '100px',
    position: 'absolute',
    marginTop: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const SInfoBox = styled(Box)({
    width: '200px',
    height: '290px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const NoFile: React.FC<props> = ({ message, subMessage, children }) => {
    return (
        <SBox>
            <SInfoBox>
                {children}
                <SMessageBox>
                    <Typography sx={{ color: '#3c4043', fontSize: '18px' }}>{message}</Typography>
                    <Typography sx={{ color: '#3c4043', fontSize: '14px' }}>{subMessage}</Typography>
                </SMessageBox>
            </SInfoBox>
        </SBox>
    );
};

export default NoFile;
