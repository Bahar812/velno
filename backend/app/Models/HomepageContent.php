<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageContent extends Model
{
    protected $fillable = [
        'key',
        'title',
        'subtitle',
        'body',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
