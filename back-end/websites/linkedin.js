const isValid = (username) => {
    // to do
    const pattern = /^(?!\.)[a-zA-Z0-9.\-_]{3,30}$/;
    return pattern.test(username);
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return '2manual';
}