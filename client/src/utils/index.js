export const setAuthToken = (token) => {
    localStorage.setItem('jwt', token);
};
export const formatDateFromUnixTimestamp = (unixTimestamp) => {
    const float = parseFloat(unixTimestamp);
    const date = new Date(float * 1000);
    const iso8601String = date.toISOString();
    return iso8601String;
};
