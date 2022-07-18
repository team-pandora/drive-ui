import { StatusCodes } from 'http-status-codes';

export const handleError = (error: any, relayState: string) => {
    if (error.request?.status === StatusCodes.UNAUTHORIZED) {
        document.location.href = `/auth/login?relayState=/${relayState}`;
        return null;
    }
    throw new Error('Something went wrong');
};
