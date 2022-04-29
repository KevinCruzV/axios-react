<?php

use Firebase\JWT\JWT;

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Blog.php';
require_once 'vendor/autoload.php';

$token = str_replace('Bearer ', '', getallheaders()['Authorization'] ?? '') ?? '';

/**
 * Je pourrais ne pas passer d'authorization en header
 * et simplement me servir du fait que le cookie d'auth
 * est passé également en requête !
 * Attention cependant à la validité du cookie.
 * Il faudrait le vérifier avant la requête, on en reparle
 * avec les Interceptor de Axios !
 */
$token = $_COOKIE['hetic_token'] ?? '';
$blogTitle = $_POST['title'] ?? '';
$blogContent = $_POST['content'] ?? '';

if (!$token) {
    echo json_encode([
        'status' => 'error',
        'message' => 'You need a bearer token to post here'
    ]);
    exit;
}

if (!$blogContent || !$blogTitle) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Your blog needs a title and a content'
    ]);
    exit;
}


$InstancePdo = new PDOFactory();
$pdo = $InstancePdo->getPdo();

try {


    $jwt = JWT::decode($token,new \Firebase\JWT\Key('une_petite_key_secrete', 'HS256'));




    $blog = (new Blog())
        ->setTitle($blogTitle)
        ->setContent($blogContent)
        ->setAuthorId($jwt->userid);

    $update = $pdo->prepare('INSERT INTO Blog (title, content, authorId, date) VALUES (:title, :content, :authorId, NOW())');
    $update->bindValue('title', $blog->getTitle(), PDO::PARAM_STR);
    $update->bindValue('content', $blog->getContent(), PDO::PARAM_STR);
    $update->bindValue('authorId', $jwt->userid, PDO::PARAM_INT);

    if ($update->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Blog saved',
            'cookie' => $_COOKIE['hetic_token'] ?? 'expired cookie'
        ]);
    }



}
catch (\Firebase\JWT\ExpiredException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Le token est expiré'
    ]);

}

finally {
    exit;
}


