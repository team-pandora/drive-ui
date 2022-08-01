import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPermittedUsers } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import getRandomColor from '../../../utils/time';
import { GenericDialog } from '../Dialog';
import InfoBody from './InfoBody';

interface IUser {
    name: string;
    mail: string;
    color: string;
}

const InfoDialog = () => {
    // console.log('info');

    const dispatch = useDispatch();
    const [owner, setOwner] = useState<IUser | null>();
    const [permittedUsers, setPermittedUsers] = useState<IUser[]>([]);
    const selectorFunction = (state: any) => state.popups.info;
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const infoPopup = useSelector((state: any) => state.popups.info);

    const handleClose = () => {
        dispatch(popupActions.setInfo());
    };

    useEffect(() => {
        if (selectedFiles.length) {
            getPermittedUsers(selectedFiles[0].fsObjectId).then((users) => {
                const tempUsers: IUser[] = [];

                users.forEach((user: any) => {
                    if (user.state.permission === 'owner') {
                        setOwner({
                            name: user.user.fullName,
                            mail: user.user.mail,
                            color: getRandomColor(user.user.fullName),
                        });
                    } else {
                        tempUsers.push({
                            name: user.user.fullName,
                            mail: user.user.mail,
                            color: getRandomColor(user.user.fullName),
                        });
                    }

                    setPermittedUsers([...tempUsers]);
                });
            });
        }
    }, [infoPopup]);

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            {owner && <InfoBody owner={owner} users={permittedUsers} />}
        </GenericDialog>
    );
};

export default InfoDialog;
