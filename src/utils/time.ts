import randomColor from 'randomcolor';

const getRandomColor = (name: string) => {
    return randomColor({ seed: name });
};

export const ISOStringToDateString = (ISOString: string, locales: string) => {
    const date = new Date(ISOString);
    const stringDate = date.toLocaleString(locales, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
    return stringDate;
};

export const checkIfRecent = (date: string) => {
    const now = new Date();
    const dateToCheck = new Date(date);
    const diff = now.getTime() - dateToCheck.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) {
        return true;
    }
    return false;
};

export default getRandomColor;
