import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getFile } from '../api/files';
import { IServerError } from '../utils/types';

export const useFiles = (folderId: string | null, setFiles: (files: any[]) => void): boolean => {
    const { isLoading } = useQuery('files', () => getFile(folderId), {
        onError: (error: IServerError) => {
            toast.error('Failed loading files');
            setFiles([
                {
                    stateId: '62710296d7982acc26fdf98a',
                    userId: '62655a5dd681ae7e5f9eafe0',
                    fsObjectId: '62710296d7982acc26fdf98a',
                    favorite: false,
                    trash: false,
                    trashRoot: false,
                    root: true,
                    permission: 'write',
                    stateCreatedAt: '2022-05-03T10:23:18.582Z',
                    stateUpdatedAt: '2022-05-03T10:23:18.582Z',
                    name: 'folder-test1',
                    parent: null,
                    type: 'folder',
                    fsObjectCreatedAt: '2022-05-03T10:23:18.580Z',
                    fsObjectUpdatedAt: '2022-05-03T10:23:18.580Z',
                },
                {
                    stateId: '62710296d7982acc26fdf98b',
                    userId: '62655a5dd681ae7e5f9eafe0',
                    fsObjectId: '62710296d7982acc26fdf98b',
                    favorite: false,
                    trash: false,
                    trashRoot: false,
                    root: true,
                    permission: 'write',
                    stateCreatedAt: '2022-05-03T10:23:18.582Z',
                    stateUpdatedAt: '2022-05-03T10:23:18.582Z',
                    name: 'folder-test2',
                    parent: null,
                    type: 'folder',
                    fsObjectCreatedAt: '2022-05-03T10:23:18.580Z',
                    fsObjectUpdatedAt: '2022-05-03T10:23:18.580Z',
                },
                {
                    stateId: '62710296d7982acc26fdf98c',
                    userId: '62655a5dd681ae7e5f9eafe0',
                    fsObjectId: '62710296d7982acc26fdf98c',
                    favorite: false,
                    trash: false,
                    trashRoot: false,
                    root: true,
                    permission: 'write',
                    stateCreatedAt: '2022-05-03T10:23:18.582Z',
                    stateUpdatedAt: '2022-05-03T10:23:18.582Z',
                    name: 'folder-test3',
                    parent: null,
                    type: 'folder',
                    fsObjectCreatedAt: '2022-05-03T10:23:18.580Z',
                    fsObjectUpdatedAt: '2022-05-03T10:23:18.580Z',
                },
            ]);
        },
        onSuccess: (data) => {
            setFiles(data);
        },
    });

    return isLoading;
};
