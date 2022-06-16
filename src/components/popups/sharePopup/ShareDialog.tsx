import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { usersActions } from '../../../store/users';
import { GenericDialog } from '../Dialog';
import SharePopup from './SharePopup';

const ShareDialog = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.share;

    const handleClose = () => {
        dispatch(popupActions.setShare());
        dispatch(usersActions.setUsers([]));
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <SharePopup />
        </GenericDialog>
    );
};

export default ShareDialog;
