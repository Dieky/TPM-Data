// function to make sure the first 1-2 values are digits. If no digits or letters are provided it returns null
export function validateExpiration(text) {
    const rx = new RegExp(/^\d{1,2}/);
    let result = rx.exec(text);
    if (result == null) {
        return null;
    } else {
        return result[0];
    }
}
// function to make sure the first 1-5 values are digits. If no digits or letters are provided it returns null
export function validateAmount(text) {
    const rx = new RegExp(/^\d{1,5}/);
    let result = rx.exec(text);
    if (result == null) {
        return null;
    } else {
        return result[0];
    }
}

export function ValidateEmail(mail) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(mail);
    return result;
}