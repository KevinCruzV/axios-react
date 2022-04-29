<?php

class CookieHelper
{
    public static function setCookie(string $token): void
    {
        setcookie('hetic_token', $token, '/', 'localhost', false, false);
        //setcookie('hetic_username', $username, time() + 20, '/', 'localhost', false, false);
    }
}
