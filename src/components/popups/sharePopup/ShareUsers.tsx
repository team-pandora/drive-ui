import { PersonAddAlt, QuestionMarkOutlined } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    styled,
    Tooltip,
    Typography,
    Zoom,
} from '@mui/material';
import i18next from 'i18next';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { handleErrorMsg } from '../../../api/error';
import { getPermittedUsers, shareFile } from '../../../api/files';
import { Permissions } from '../../../constants/index';
import { notificationsActions } from '../../../store/notifications';
import { permissionActions } from '../../../store/permissions';
import { popupActions } from '../../../store/popups';
import { usersActions } from '../../../store/users';
import Owners from './Owners';
import SearchUsers from './SearchUsers';

const AccordionSummaryBox = styled(AccordionSummary)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
});

const SBox = styled(Box)({
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'flex-end',
    marginTop: '20px',
});

const SummaryBoxStyle = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

const SButton = styled(Button)({
    margin: '0px 1%',
    textTransform: 'none',
});

type props = { isOpen: boolean; handleChange: () => void };

const ShareUsers: React.FC<props> = ({ isOpen, handleChange }) => {
    const dispatch = useDispatch();
    const dir = i18next.dir(i18next.language);
    const selectedUsers = useSelector((state: any) => state.users.selectedUsers);
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const selectedPermission = useSelector((state: any) => state.permissions.selectedPermission);
    const currentUser = useSelector((state: any) => state.users.user);

    useQuery('permittedUsers', () => getPermittedUsers(selectedFiles[0].fsObjectId), {
        onSuccess: (data) => {
            dispatch(
                permissionActions.setFilePermissionsData({
                    fileId: selectedFiles[0].fsObjectId,
                    owner: data.find((user: any) => user.state.permission === Permissions.owner),
                    currentUserPermission: data.find((permission: any) => permission.state.userId === currentUser.id)
                        .state.permission,
                    permittedUsers: data,
                }),
            );
        },
        onError: handleErrorMsg('Failed loading shared users', 'my-drive'),
    });

    const { isLoading, mutateAsync } = useMutation(
        (shareObject: any) => shareFile(shareObject.fsObjectId, shareObject.userId, shareObject.permission),
        {
            onSuccess: () => {
                dispatch(notificationsActions.setSimpleOpen(`${i18next.t('messages.PermissionChanged')}`));
                dispatch(usersActions.setSelectedUsers([]));
            },
            onError: handleErrorMsg('Failed sharing files', 'my-drive'),
        },
    );

    const handleClose = () => {
        dispatch(popupActions.setShare());
    };

    const handleClick = async () => {
        selectedFiles.forEach(async (file: any) => {
            selectedUsers.forEach(async (user: any) => {
                const shareObject = {
                    fsObjectId: file.fsObjectId,
                    userId: user.id,
                    permission: selectedPermission,
                };
                mutateAsync(shareObject);
            });
        });
        dispatch(popupActions.setShare());
    };

    return (
        <Accordion expanded={isOpen} onChange={handleChange} dir={dir}>
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                    height: '80px',
                }}
            >
                <AccordionSummaryBox>
                    <Avatar sx={{ backgroundColor: isOpen ? '#4285f4' : '#9aa0a6' }}>
                        <PersonAddAlt />
                    </Avatar>
                    <SummaryBoxStyle>
                        <Typography sx={{ margin: '0 10px', fontSize: '22px' }}>
                            {`${i18next.t('messages.SharePopupTitle')}`}
                        </Typography>
                        <Tooltip
                            TransitionComponent={Zoom}
                            title={
                                <Typography sx={{ userSelect: 'none' }} variant="subtitle2">{`${i18next.t(
                                    'messages.SearchHelp',
                                )}`}</Typography>
                            }
                            placement={dir === 'rtl' ? 'bottom' : 'bottom'}
                        >
                            <QuestionMarkOutlined
                                sx={{
                                    color: '#757575',
                                    '&:hover': {
                                        cursor: 'default',
                                    },
                                }}
                            />
                        </Tooltip>
                    </SummaryBoxStyle>
                </AccordionSummaryBox>
            </AccordionSummary>

            <AccordionDetails>
                <SearchUsers />
                <Owners />
                <SBox>
                    <SButton onClick={handleClose} variant="text">{`${i18next.t('buttons.Cancel')}`}</SButton>
                    <SButton onClick={handleClick} variant="contained">{`${i18next.t('buttons.Share')}`}</SButton>
                </SBox>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShareUsers;
