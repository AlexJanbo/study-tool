export const setAuthToken = (token: string) => {
    localStorage.setItem('jwtToken', token)
}