
export const saveTokensInSession = (accessToken, refreshToken) => {
    // window.sessionStorage.setItem('token', token)
    window.localStorage.setItem('accessToken', accessToken)
    window.localStorage.setItem('refreshToken', refreshToken)
}