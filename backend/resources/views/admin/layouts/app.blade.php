<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Admin Velno' }}</title>
    <style>
        :root {
            --bg: #f3f0ff;
            --card: #ffffff;
            --text: #2b2144;
            --muted: rgba(43, 33, 68, 0.6);
            --accent: #6a43ff;
            --accent-2: #8b62ff;
            --border: rgba(122, 75, 255, 0.15);
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: "DM Sans", "Segoe UI", sans-serif;
            background: var(--bg);
            color: var(--text);
        }
        a { color: inherit; text-decoration: none; }
        .layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
        .sidebar {
            background: linear-gradient(180deg, #6a43ff 0%, #8b62ff 100%);
            color: #fff;
            padding: 26px 18px;
            border-right: none;
        }
        .sidebar h1 { font-size: 18px; margin: 0 0 24px; }
        .nav a {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 12px;
            margin-bottom: 6px;
            border-radius: 12px;
            font-size: 14px;
            color: rgba(255,255,255,0.85);
        }
        .nav a.active, .nav a:hover { background: rgba(255,255,255,0.16); color: #fff; }
        .content { padding: 28px 32px; }
        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 20px;
            box-shadow: 0 18px 40px rgba(92, 53, 220, 0.08);
        }
        .card + .card { margin-top: 16px; }
        .grid { display: grid; gap: 16px; }
        .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        .table-card {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 12px;
            font-size: 14px;
        }
        .table-card th {
            text-align: left;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--muted);
            padding: 0 14px 6px;
        }
        .table-card td {
            background: #fff;
            padding: 12px 14px;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
        }
        .table-card td:first-child {
            border-left: 1px solid var(--border);
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
        }
        .table-card td:last-child {
            border-right: 1px solid var(--border);
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
        }
        .avatar {
            width: 36px;
            height: 36px;
            border-radius: 12px;
            background: #efe6ff;
            color: #5c35dc;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
        }
        .status-pill {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
        }
        .status-active { background: #e9f7ee; color: #1f9254; }
        .status-admin { background: #efe6ff; color: #5c35dc; }
        .table-actions {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .icon-btn {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: #fff;
            color: #5c35dc;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .toolbar {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .tabs {
            display: inline-flex;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
        }
        .tab {
            padding: 8px 14px;
            font-size: 13px;
            color: var(--muted);
            background: transparent;
            border: none;
            cursor: pointer;
        }
        .tab.active {
            background: #f1eaff;
            color: #5c35dc;
        }
        .table th, .table td {
            text-align: left;
            padding: 10px 8px;
            border-bottom: 1px solid var(--border);
        }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            border-radius: 10px;
            border: none;
            background: var(--accent);
            color: #fff;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-secondary {
            background: #ebe3ff;
            color: #4a2ab6;
        }
        .btn-danger {
            background: #ff4d6d;
        }
        .btn-link { background: transparent; color: var(--accent); padding: 0; border: none; cursor: pointer; }
        .muted { color: var(--muted); }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            background: #f1eaff;
            color: #5c35dc;
            font-size: 12px;
        }
        .form-group { margin-bottom: 16px; }
        label { display: block; font-size: 13px; margin-bottom: 6px; color: var(--muted); }
        input, textarea, select {
            width: 100%;
            padding: 10px 12px;
            border-radius: 10px;
            border: 1px solid var(--border);
            font-size: 14px;
        }
        .checkbox-row {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: var(--muted);
        }
        .checkbox-row input {
            width: auto;
            margin: 0;
        }
        textarea { min-height: 120px; }
        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .search {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #fff;
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid var(--border);
            min-width: 220px;
        }
        .flash {
            padding: 12px 14px;
            border-radius: 10px;
            background: #e9ddff;
            color: #4a2ab6;
            margin-bottom: 16px;
        }
        @media (max-width: 900px) {
            .layout { grid-template-columns: 1fr; }
            .sidebar { border-bottom: 1px solid rgba(255,255,255,0.2); }
            .grid-3, .grid-4 { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="layout">
        <aside class="sidebar">
            <h1>Velno Admin</h1>
            <nav class="nav">
                <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">Dashboard</a>
                <a href="{{ route('admin.users.index') }}" class="{{ request()->routeIs('admin.users.*') ? 'active' : '' }}">Users</a>
                <a href="{{ route('admin.portfolios.index') }}" class="{{ request()->routeIs('admin.portfolios.*') ? 'active' : '' }}">Portfolio</a>
                <a href="{{ route('admin.homepage.index') }}" class="{{ request()->routeIs('admin.homepage.*') ? 'active' : '' }}">Homepage</a>
                <form action="{{ route('admin.logout') }}" method="POST" style="margin-top:16px;">
                    @csrf
                    <button class="btn btn-secondary" type="submit">Logout</button>
                </form>
            </nav>
        </aside>
        <main class="content">
            @if(session('status'))
                <div class="flash">{{ session('status') }}</div>
            @endif
            @yield('content')
        </main>
    </div>
</body>
</html>
