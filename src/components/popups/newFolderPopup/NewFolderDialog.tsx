import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import NewFolderPopup from './NewFolderPopup';

const NewFolderDialog = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.newFolder;

    const handleClose = () => {
        dispatch(popupActions.setNewFolder());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <NewFolderPopup />
        </GenericDialog>
    );
};

export default NewFolderDialog;
