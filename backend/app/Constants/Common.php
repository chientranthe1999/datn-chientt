<?php


namespace App\Constants;


class Common
{
    const CATEGORY_TYPE = [
        'DEBT' => "DEBT",
        'SALARY' => 'SALARY',
        'INCOME' => 'INCOME',
        'EXPENSE' => 'EXPENSE',
    ];

    const TASK_PRIORITY = [
        'LOW' => 'LOW',
        'MEDIUM' => 'MEDIUM',
        'HIGH' => 'HIGH',
        'URGENT' => 'URGENT'
    ];

    const USER_REQUEST = [
      'ACTIVE_ACCOUNT' => 'ACTIVE_ACCOUNT',
      'FORGET_PASSWORD' => 'FORGET_PASSWORD'
    ];

    const CLIENT_REDIRECT_URI = [
      'ACTIVE_ACCOUNT' => '/active-account'
    ];

    const REQUEST_ACCOUNT_TOKEN_LENGTH = 60;

    const ACCOUNT_REQUEST_STATUS = [
      'NOT_MATCH_TYPE' => 'NOT_MATCH_TYPE',
      'NOT_MATCH_USER' => 'NOT_MATCH_USER',
      'TOKEN_EXPIRED' => 'TOKEN_EXPIRED',
      'INVALID_TOKEN' => 'INVALID_TOKEN',
      'VALID' => 'VALID'
    ];
}
