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
                owner={{ name: 'Owner', mail: 'maya.fisher@gmail.com', color: 'turquoise' }}
                users={[
                    { name: 'C', mail: 'maya.fisher@gmail.com', color: '#48a1ab' },
                    { name: 'F', mail: 'maya.fisher@gmail.com', color: '#52b2bb' },
                    { name: 'Test', mail: 'maya.fisher@gmail.com', color: '#0c7684' },
                    { name: 'Maya', mail: 'maya.fisher@gmail.com', color: '#1290b3' },
                    { name: 'A', mail: 'maya.fisher@gmail.com', color: '#14678d' },
                    { name: 'Test', mail: 'maya.fisher@gmail.com', color: '#124663' },
                    { name: 'B', mail: 'maya.fisher@gmail.com', color: 'purple' },
                    { name: 'Test', mail: 'maya.fisher@gmail.com', color: 'orange' },
                    { name: 'N', mail: 'maya.fisher@gmail.com', color: 'purple' },
                ]}
            />
        </GenericDialog>
    );
};

export default InfoDialog;
