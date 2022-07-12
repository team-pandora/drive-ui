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
            <InfoBody
                owner={{ name: 'Owner', color: 'turquoise' }}
                users={[
                    { name: 'C', color: '#48a1ab' },
                    { name: 'F', color: '#52b2bb' },
                    { name: 'Test', color: '#0c7684' },
                    { name: 'Maya', color: '#1290b3' },
                    { name: 'A', color: '#14678d' },
                    { name: 'Test', color: '#124663' },
                    { name: 'B', color: 'purple' },
                    { name: 'Test', color: 'orange' },
                    { name: 'N', color: 'purple' },
                ]}
            />
        </GenericDialog>
    );
};

export default InfoDialog;
