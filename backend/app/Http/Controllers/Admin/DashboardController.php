<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;
use App\Models\Portfolio;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard', [
            'userCount' => User::count(),
            'portfolioCount' => Portfolio::count(),
            'homepageCount' => HomepageContent::count(),
        ]);
    }
}
