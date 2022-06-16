import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import InfoPopup from './InfoPopup';

const InfoDialog = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.info;

    const handleClose = () => {
        dispatch(popupActions.setInfo());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <InfoPopup />
        </GenericDialog>
    );
};

export default InfoDialog;
