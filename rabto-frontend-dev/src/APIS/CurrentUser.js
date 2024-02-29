import Cookies from 'js-cookie';
import { jwtDecode }from 'jwt-decode';

function getUserIDFromCookie() {
    const cookie = Cookies.get("mycookie");
    let userID = "";
    let userName = "";

    if (cookie) {
        const responsePayload = jwtDecode(cookie);
        userID = responsePayload.id;
        userName = responsePayload.userName;
    }

    return {userID,userName};
}

export const user = getUserIDFromCookie();
