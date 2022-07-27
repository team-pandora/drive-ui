import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { handleErrorMsg } from '../api/error';
import { filesActions } from '../store/files';

export const useFiles = (pageKey: string, folderId: string, getFilesFunc: any): boolean => {
    const dispatch = useDispatch();
    const { isFetching } = useQuery([pageKey, folderId], () => getFilesFunc(folderId), {
        onError: handleErrorMsg('Failed loading files', window.location.pathname.slice(1)),
        onSuccess: (data) => {
            dispatch(filesActions.setFiles(data));
        },
        retry: false,
    });

    return isFetching;
};
