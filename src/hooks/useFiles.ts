import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getFile } from '../api/files';
import { IServerError } from '../utils/types';

export const useFiles = (folderId: string | null): [Array<any>, boolean] => {
    let files: any[] = [];
    const { isLoading } = useQuery('files', () => getFile(folderId), {
        onError: (error: IServerError) => {
            toast.error('Failed loading files');
        },
        onSuccess: (data) => {
            files = data;
        },
    });

    return [files, isLoading];
};
