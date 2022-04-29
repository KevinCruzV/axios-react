<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/TokenHelper.php';
require_once 'Classes/User.php';
require_once 'Classes/CookieHelper.php';
require_once  'vendor/autoload.php';

$username = $_REQUEST['username'] ?? '';
$password = $_REQUEST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode([
        'status' => 'error',
        'message' => 'username or password parameters missing'
    ]);
    exit;
}


$pdo = (new PDOFactory())->getPdo();
$query = $pdo->prepare('SELECT COUNT(*) FROM `User` WHERE `username` = :username');
$query->bindValue('username', $username, PDO::PARAM_STR);
$query->execute();

$userAlreadyExists = (bool)$query->fetchAll(PDO::FETCH_ASSOC)[0]["COUNT(*)"];

if ($userAlreadyExists) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Username already exists'
    ]);
    exit;
}

$insert = $pdo->prepare('INSERT INTO User (`username`, `password`) VALUES (:username, :password)');
$insert->bindValue('username', $username, PDO::PARAM_STR);
$insert->bindValue('password', password_hash($password, PASSWORD_BCRYPT), PDO::PARAM_STR);


if ($insert->execute()) {
    $lastInsertId = $pdo->lastInsertId();
    $return = $pdo->query("SELECT * FROM User WHERE id = {$lastInsertId}");
    $return->setFetchMode(PDO::FETCH_CLASS, User::class);
    /** @var User $newUser */
    $newUser = $return->fetch();



    CookieHelper::setCookie($newUser->getToken(), $newUser->getUsername());

    echo json_encode([
        'status' => 'success',
        'username' => $newUser->getUsername(),
        'token' => $newUser->getToken()
    ]);
    exit;
}

