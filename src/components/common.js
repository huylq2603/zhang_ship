export const setCookie = (key, value, expHours) => {
    var d = new Date();
    d.setTime(d.getTime() + (expHours * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = key + '=' + value + ';' + expires + ';path=/';
}

export const getCookie = (key) => {
    var name = key + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export const isAuth = () => {
    const auth = getCookie(AUTH_COOKIE);
    if (!auth || auth !== 'true') {
        setCookie(AUTH_COOKIE, false, 0); // delete the cookie
    }
    return auth === 'true';
}

export const AUTH_COOKIE = "auth";
