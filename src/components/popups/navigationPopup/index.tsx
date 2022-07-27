import { Box, Divider, styled } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSubfolders } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import { GenericDialog } from '../Dialog';
import NavigationBody from './NavigationBody';
import NavigationFooter from './NavigationFooter';
import NavigationHeader from './NavigationHeader';

const SBox = styled(Box)({
    width: '100%',
    height: 'fit-content',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    overflow: 'hidden',
});

type props = {
    initialParent?: string | undefined | null;
    fsObjectIds: string[];
};

const NavigationDialog: React.FC<props> = ({ initialParent, fsObjectIds }) => {
    const dir = i18next.dir(i18next.language);

    const [parent, setParent] = useState<string | undefined | null>(initialParent);
    const dispatch = useDispatch();
    const selectorFunction = (state: any) => state.popups.navigation;

    const handleClose = () => {
        setParent(undefined);
        dispatch(popupActions.setNavigation());
    };

    const [files, setFiles] = useState<any>([]);

    const fetchData = async () => {
        if (parent !== undefined) setFiles(await getSubfolders(parent));
    };

    useEffect(() => {
        fetchData();
    }, [parent]);

    return (
        <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
            <SBox sx={{ dir }}>
                <NavigationHeader parent={parent} setParent={setParent} />
                <NavigationBody parent={parent} setParent={setParent} files={files} />
                <Divider />
                <NavigationFooter parent={parent!} fetchFunc={fetchData} fsObjectIds={fsObjectIds} />
            </SBox>
        </GenericDialog>
    );
};

export default NavigationDialog;
