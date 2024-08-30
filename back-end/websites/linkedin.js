const isValid = (username) => {
    // ok
    const pattern = /^[a-zA-Z0-9\-]{3,100}$/;
    return pattern.test(username);
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return '2manual';
}