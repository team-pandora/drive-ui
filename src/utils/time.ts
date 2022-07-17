const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
