<?php

class TokenHelper
{
    static public function buildToken()
    {
        $bytes = random_bytes(50);
        return bin2hex($bytes);
    }
}
