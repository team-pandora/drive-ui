import { List, styled, Typography } from '@mui/material';
import i18next from 'i18next';

const PropertyList = styled(List)({
    color: 'gray',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'start',
    margin: '0px 1vw 1px 1vw',
    caretColor: 'transparent',
});

type props = {
    isDeleted: boolean;
};

const SValues = styled(Typography)({
    fontSize: '14px',
});

export const InfoProperties: React.FC<props> = ({ isDeleted }) => {
    return (
        <PropertyList onDragStart={(event) => event.preventDefault()}>
            <SValues>{`${i18next.t('info.Type')}`}</SValues>
            <SValues>{`${i18next.t('info.Size')}`}</SValues>
            <SValues>{`${i18next.t('info.Location')}`}</SValues>
            <SValues>{`${i18next.t('info.Permission')}`}</SValues>
            <SValues>{`${i18next.t('info.Modified')}`}</SValues>
            <SValues>{`${i18next.t('info.Created')}`}</SValues>
            {isDeleted && <Typography>{`${i18next.t('info.Deleted')}`}</Typography>}
        </PropertyList>
    );
};

InfoProperties.defaultProps = {
    isDeleted: false,
};
