export const setUser = (key, value) => {
    localStorage.setItem(key, value);
}

export const getUser = (key) => {
    return localStorage.getItem(key)
}