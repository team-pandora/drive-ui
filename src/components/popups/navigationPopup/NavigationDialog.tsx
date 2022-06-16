import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import NavigationPopup from './NavigationPopup';

const NavigationDialog = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.navigation;

    const handleClose = () => {
        dispatch(popupActions.setNavigation());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <NavigationPopup />
        </GenericDialog>
    );
};

export default NavigationDialog;
