import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../../../store/popups';
import UserAvatar from '../../layout/Avatar';
import { InfoProperties } from './InfoProperties';
import { InfoValues } from './InfoValues';

const Info = styled(Box)({
    width: '100%',
    height: '100%',
    borderBottom: 'solid 1px lightgray',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
});

const InfoHeader = styled(Box)({
    margin: '2rem',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
});

const InfoBox = styled(Box)({
    display: 'flex',
    flexFlow: 'row nowrap',
    gap: '0vw',
});

const InfoText = styled(Typography)({
    margin: '0 2vw 0 2vw',
});

const InfoAccess = styled(Box)({
    margin: '8px 2vw 0 2vw',
    display: 'flex',
    flexFlow: 'row nowrap',

    '& .MuiButtonBase-root': {
        padding: '0 0.3vw 0 0',
    },
});

const FileOwner = styled(Box)({
    '& .MuiButtonBase-root': {
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,.2)',
        borderRadius: '0',
        borderWidth: `${i18next.dir(i18next.language) === 'ltr' ? '0 1px 0 0' : '0 0 0 1px'}`,
        padding: `${i18next.dir(i18next.language) === 'ltr' ? '0 9px 0 0' : '0 0 0 9px'}`,
        margin: `${i18next.dir(i18next.language) === 'ltr' ? '0 8px 0 0' : '0 0 0 9px'}`,
    },
});

const InfoPopup = (props: any) => {
    const dir = i18next.dir(i18next.language);
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const dispatch = useDispatch();

    return (
        <Info dir={dir}>
            <InfoHeader>
                <Typography>{selectedFiles}</Typography>
                <ImageIcon />
            </InfoHeader>
            <InfoText>{`${i18next.t('info.HaveAccess')}`}</InfoText>
            <InfoAccess>
                {/* TODO: yonatan */}
                <FileOwner>
                    <UserAvatar name={props.owner.name} color={props.owner.color}></UserAvatar>
                </FileOwner>
                {props.users.map((user: { name: string; color: string }) => {
                    return <UserAvatar name={user.name} color={user.color} />;
                })}
            </InfoAccess>
            <Button
                variant="text"
                sx={{
                    height: '32px',
                    width: 'fit-content',
                    textTransform: 'none',
                    margin: '0.5rem 2vw',
                }}
                onClick={() => {
                    dispatch(popupActions.setInfo());
                    dispatch(popupActions.setShare());
                }}
            >
                {`${i18next.t('buttons.Access')}`}
            </Button>
            <InfoText>{`${i18next.t('messages.Properties')}`}</InfoText>
            <InfoBox>
                <InfoProperties></InfoProperties>
                <InfoValues
                    type="PNG"
                    size="1.5MB"
                    owner="Example"
                    modified="2020-01-01"
                    created="2020-01-01"
                ></InfoValues>
            </InfoBox>
        </Info>
    );
};

InfoPopup.defaultProps = {
    owner: {
        name: 'Example owner',
        color: 'blue',
    },
    users: [
        { name: 'test', color: 'gray' },
        { name: 'aaa', color: 'gray' },
        { name: 'bbb', color: 'gray' },
        { name: 'ccc', color: 'gray' },
        { name: 'ddd', color: 'gray' },
    ],
};
export default InfoPopup;
