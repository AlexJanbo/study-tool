export const setAuthToken = (token: string) => {
    localStorage.setItem('jwt', token)
}

export const formatDate = (date: string) => {
    let formattedDate = new Date(date).toLocaleString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
    return formattedDate
}
