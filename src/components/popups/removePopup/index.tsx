import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import RemoveBody from './RemoveBody';

const RemovePopup = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.remove;

    const handleClose = () => {
        dispatch(popupActions.setHelp());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <RemoveBody />
        </GenericDialog>
    );
};

export default RemovePopup;
