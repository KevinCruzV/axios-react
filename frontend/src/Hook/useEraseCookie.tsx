import useGetCookies from "./useGetCookies";

export default function useEraseCookie() {
    return () => {
        document.cookie = 'hetic_token'+'=; Max-Age=-99999999;';
        document.cookie = 'hetic_username'+'=; Max-Age=-99999999;';
    }
}
