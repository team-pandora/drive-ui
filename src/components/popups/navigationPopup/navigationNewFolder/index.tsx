import { useDispatch } from 'react-redux';
import { popupActions } from '../../../../store/popups';
import { GenericDialog } from '../../Dialog';
import NavigationNewPopup from './NavigationNewFolderPopup';

type props = {
    parent: string | null | undefined;
    fetchFunc: any;
};

export const NewFolderDialog: React.FC<props> = ({ parent, fetchFunc }) => {
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.navigationNewFolder;

    const handleClose = () => {
        dispatch(popupActions.setNavigationNewFolder());
    };

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <NavigationNewPopup parent={parent} fetchFunc={fetchFunc} />
        </GenericDialog>
    );
};

export default NewFolderDialog;
