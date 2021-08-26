export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const removeUserSession = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
}