<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'title',
        'year',
        'description',
        'portfolio_link',
        'bullets',
        'tags',
        'images',
        'is_active',
    ];

    protected $casts = [
        'bullets' => 'array',
        'tags' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
    ];
}
