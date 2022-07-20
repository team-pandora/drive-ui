/* eslint-disable consistent-return */
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

export const handleError = (error: any, relayState: string) => {
    if (error.request?.status === StatusCodes.UNAUTHORIZED) {
        document.location.href = `/auth/login?relayState=/${relayState}`;
        return null;
    }
    throw new Error('Something went wrong');
};

export const handleErrorMsg = (message: string, relayState: string) => (error: any) => {
    console.log('hhhhhh');
    if (error.request?.status === StatusCodes.UNAUTHORIZED) {
        document.location.href = `/auth/login?relayState=/${relayState}`;
        return null;
    }
    console.log(`${message}. error: ${error}`);
    toast.error(`${message}`);
};
