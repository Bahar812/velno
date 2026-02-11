@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Dashboard</h2>
        <div class="search">Search...</div>
        <span class="badge">Admin Panel</span>
    </div>
    <div class="grid grid-3">
        <div class="card">
            <h3>Users</h3>
            <p class="muted">{{ $userCount }} akun terdaftar</p>
        </div>
        <div class="card">
            <h3>Portfolio</h3>
            <p class="muted">{{ $portfolioCount }} item</p>
        </div>
        <div class="card">
            <h3>Homepage</h3>
            <p class="muted">{{ $homepageCount }} konten</p>
        </div>
    </div>
    <div class="grid grid-3" style="margin-top:16px;">
        <div class="card">
            <h3>Sessions</h3>
            <p class="muted">24k (+33.4%)</p>
        </div>
        <div class="card">
            <h3>Avg. Session</h3>
            <p class="muted">00:18 (-12.6%)</p>
        </div>
        <div class="card">
            <h3>Bounce Rate</h3>
            <p class="muted">$2400 (-62.1%)</p>
        </div>
    </div>
    <div class="grid grid-3" style="margin-top:16px;">
        <div class="card" style="grid-column: span 2;">
            <h3>Profile Growth</h3>
            <div style="height:220px; background:#f1eaff; border-radius:14px; margin-top:12px;"></div>
        </div>
        <div class="card">
            <h3>Analytics</h3>
            <div style="height:220px; background:#f1eaff; border-radius:14px; margin-top:12px;"></div>
        </div>
    </div>
    <div class="grid grid-4" style="margin-top:16px;">
        <div class="card">
            <h3>Subscribers</h3>
            <p class="muted">5,095</p>
        </div>
        <div class="card">
            <h3>Revenue</h3>
            <p class="muted">47,095</p>
        </div>
        <div class="card">
            <h3>Engagement</h3>
            <p class="muted">25.81</p>
        </div>
        <div class="card">
            <h3>Avg. Watch</h3>
            <p class="muted">45:42</p>
        </div>
    </div>
@endsection
