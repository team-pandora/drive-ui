import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getMyDriveFiles } from '../api/files';
import { filesActions } from '../store/files';
import { IServerError } from '../utils/types';

export const useFiles = (folderId: string, getFilesFunc: any): boolean => {
    const dispatch = useDispatch();
    const { isLoading } = useQuery('files', () => getFilesFunc(folderId), {
        onError: (error: IServerError) => {
            toast.error('Failed loading files');
        },
        onSuccess: (data) => {
            dispatch(filesActions.setFiles(data));
        },
    });

    return isLoading;
};
