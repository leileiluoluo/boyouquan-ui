const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValid(email: string | undefined | null): boolean {
    if (undefined === email
        || null === email
        || !emailRegex.test(email)) {
        return false;
    }
    return true;
}

