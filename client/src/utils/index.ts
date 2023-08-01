export const setAuthToken = (token: string) => {
    localStorage.setItem('jwt', token)
}