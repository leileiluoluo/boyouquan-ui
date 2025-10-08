import md5 from 'blueimp-md5';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValid(email) {
    if (undefined === email
        || null === email
        || !emailRegex.test(email)) {
        return false;
    }
    return true;
};

export function md5Value(email) {
    return md5(email);
};