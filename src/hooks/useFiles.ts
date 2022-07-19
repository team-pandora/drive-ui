import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { filesActions } from '../store/files';
import { IServerError } from '../utils/types';

export const useFiles = (pageKey: string, folderId: string, getFilesFunc: any): boolean => {
    const dispatch = useDispatch();
    const { isFetching } = useQuery([pageKey, folderId], () => getFilesFunc(folderId), {
        onError: (error: IServerError) => {
            toast.error('Failed loading files');
        },
        onSuccess: (data) => {
            dispatch(filesActions.setFiles(data));
        },
        refetchOnWindowFocus: false,
    });

    return isFetching;
};
