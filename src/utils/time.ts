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

export default getRandomColor;
