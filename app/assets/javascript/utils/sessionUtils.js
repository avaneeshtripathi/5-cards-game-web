export function setSession (key, item) {
    return sessionStorage[key] = JSON.stringify(item);
};

export function getSession (key) {
    return sessionStorage[key] ? JSON.parse(sessionStorage[key]) : null;
};

export function clearSession () {
    sessionStorage.clear();
};
