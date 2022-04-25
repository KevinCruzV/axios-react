import {CookieInterface} from "../Interface/CookieInterface";

export default function useGetCookies(): CookieInterface {
    let cookies: CookieInterface = {};

    const cookiesAsString = document.cookie.split('; ');

    cookiesAsString.map(cookie => {
        let vals = cookie.split('=');
        cookies = {
            ...cookies,
            [vals[0]]: vals[1]
        };
    });

    return cookies as CookieInterface;
}
