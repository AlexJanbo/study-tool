export const setAuthToken = (token: string) => {
    localStorage.setItem('jwt', token)
}

export const formatDateFromUnixTimestamp = (unixTimestamp: string): string => {
    const float = parseFloat(unixTimestamp)
    const date = new Date(float * 1000)
    const iso8601String = date.toISOString()
    return iso8601String
}
