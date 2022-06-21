import { useDispatch } from 'react-redux';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import InfoBody from './InfoBody';

const InfoDialog = () => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.info;

    const handleClose = () => {
        dispatch(popupActions.setInfo());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <InfoBody owner={{ name: 'Test', color: 'turquoise' }} users={[]} />
        </GenericDialog>
    );
};

export default InfoDialog;
