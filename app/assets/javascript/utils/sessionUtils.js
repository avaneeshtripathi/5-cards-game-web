import Base64 from 'base-64';

export function setSession (key, item) {
    return sessionStorage[key] = Base64.encode(JSON.stringify(item));
};

export function getSession (key) {
    return sessionStorage[key] ? JSON.parse(Base64.decode(sessionStorage[key])) : null;
};

export function clearSession () {
    sessionStorage.clear();
};
