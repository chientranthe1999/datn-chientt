<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'group_id',
        'description',
        'name',
        'total',
        'status',
        'report_exclude',
        'icon'
    ];
}
