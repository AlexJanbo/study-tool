export const setAuthToken = (token) => {
    localStorage.setItem('jwt', token);
};
export const formatDate = (date) => {
    let formattedDate = new Date(date).toLocaleString('en-us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return formattedDate;
};
