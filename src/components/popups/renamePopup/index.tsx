import { useDispatch, useSelector } from 'react-redux';
import { RenameFile } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import RenamePopup from './RenamePopup';

const RenameDialog = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.rename;

    const handleClick = () => {
        dispatch(popupActions.setRename());
    };

    return (
        <GenericDialog
            selectorFunction={selectorFunction}
            onClose={handleClick}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: { maxWidth: '650px', backgroundColor: 'transparent' },
                elevation: 0,
            }}
        >
            <RenamePopup />
        </GenericDialog>
    );
};

export default RenameDialog;
