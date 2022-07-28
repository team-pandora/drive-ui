import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyDrive from '../../pages/MyDrive';
import { filesActions } from '../../store/files';
import { popupActions } from '../../store/popups';
import InfoPopup from './infoPopup';
import RenamePopup from './renamePopup/RenamePopup';
import SharePopup from './sharePopup';
import NavigationPopup from './navigationPopup';
import { getFile } from '../../api/files';

export const OpenPopup = () => {
    const dispatch = useDispatch();
    const params: { fsObjectId: string; action: string } = useParams();
    const [file, setFile] = useState(null);

    switch (params.action) {
        case 'share':
            if (!useSelector((state: any) => state.popups.share) && file) dispatch(popupActions.setShare());
            break;
        case 'rename':
            if (!useSelector((state: any) => state.popups.rename) && file) dispatch(popupActions.setRename());
            break;
        case 'info':
            if (!useSelector((state: any) => state.popups.info) && file) dispatch(popupActions.setInfo());
            break;
        case 'move':
            if (!useSelector((state: any) => state.popups.navigation) && file)
                dispatch(popupActions.setNavigationState('move'));
            dispatch(popupActions.setNavigation());
            break;
        case 'copy':
            if (!useSelector((state: any) => state.popups.navigation) && file)
                dispatch(popupActions.setNavigationState('copy'));
            dispatch(popupActions.setNavigation());
            break;
        case 'shortcut':
            if (!useSelector((state: any) => state.popups.navigation) && file)
                dispatch(popupActions.setNavigationState('shortcut'));
            dispatch(popupActions.setNavigation());
            break;
        default:
            break;
    }

    const fetchData = async () => {
        const data = await getFile(params.fsObjectId);
        setFile(data);
        dispatch(filesActions.setSelected([data]));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <MyDrive></MyDrive>
        </>
    );
};
