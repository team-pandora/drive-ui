import { List, styled, Typography } from '@mui/material';

const ValueList = styled(List)({
    color: 'gray',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'left',
    margin: '0px 3.5vw 1px 1vw',
});

const SValues = styled(Typography)({
    fontSize: '14px',
    color: '#000000',
});

export const InfoValues = (props: any) => {
    return (
        <ValueList>
            <SValues>{props.type}</SValues>
            <SValues>{props.size}</SValues>
            <SValues>{props.parent}</SValues>
            <SValues>{props.owner}</SValues>
            <SValues>{props.modified}</SValues>
            <SValues>{props.created}</SValues>
            {props.isDeleted && <p>12 Oct 2021</p>}
        </ValueList>
    );
};

InfoValues.defaultProps = {
    isDeleted: false,
};
