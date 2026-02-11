<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Login</title>
    <style>
        body {
            margin: 0;
            font-family: "DM Sans", "Segoe UI", sans-serif;
            background: #f6f1ff;
            color: #2b2144;
        }
        .wrap {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 32px 20px;
            background: #f6f1ff;
            position: relative;
            overflow: hidden;
        }
        .mesh {
            position: absolute;
            inset: -20%;
            background:
                radial-gradient(circle at 20% 20%, rgba(122, 75, 255, 0.25), transparent 40%),
                radial-gradient(circle at 80% 10%, rgba(122, 75, 255, 0.22), transparent 45%),
                radial-gradient(circle at 50% 90%, rgba(122, 75, 255, 0.18), transparent 48%);
            opacity: 0.9;
            pointer-events: none;
        }
        .orb {
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 999px;
            filter: blur(40px);
            opacity: 0.5;
            background: radial-gradient(circle, rgba(122, 75, 255, 0.8), rgba(122, 75, 255, 0));
        }
        .orb.orb-1 { top: -40px; left: -20px; }
        .orb.orb-2 { bottom: -60px; right: -10px; width: 260px; height: 260px; }
        .card-shell {
            background: linear-gradient(135deg, rgba(122, 75, 255, 0.6), rgba(176, 123, 255, 0.6));
            padding: 1px;
            border-radius: 20px;
            box-shadow: 0 30px 70px rgba(92, 53, 220, 0.25);
            position: relative;
        }
        .card {
            width: 100%;
            max-width: 420px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border-radius: 18px;
            padding: 36px;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
        }
        h1 { font-size: 22px; margin: 0 0 8px; }
        .subtitle {
            margin: 0 0 22px;
            font-size: 13px;
            color: rgba(43, 33, 68, 0.65);
        }
        label { display: block; font-size: 13px; margin-bottom: 6px; color: rgba(43, 33, 68, 0.6); }
        input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1px solid rgba(122, 75, 255, 0.2);
            margin-bottom: 20px;
            background: #f3f0ff;
        }
        .form-row { margin-bottom: 6px; }
        .remember {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: rgba(43, 33, 68, 0.7);
            margin-bottom: 16px;
        }
        .remember input {
            width: auto;
            margin: 0;
        }
        .btn {
            width: 100%;
            padding: 12px;
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #6a43ff, #8b62ff);
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 14px 28px rgba(106, 67, 255, 0.35);
        }
        .error { color: #d92d20; font-size: 12px; margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="mesh"></div>
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="card-shell">
        <form class="card" method="POST" action="{{ route('admin.login.submit') }}">
            @csrf
            <h1>Masuk Admin</h1>
            <p class="subtitle">Kelola konten, user, dan portofolio Velno dari satu tempat.</p>
            @if ($errors->any())
                <div class="error">Email atau password tidak sesuai.</div>
            @endif
            <div class="form-row">
                <label>Email</label>
                <input type="email" name="email" value="{{ old('email') }}" required>
            </div>
            <div class="form-row">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <label class="remember">
                <input type="checkbox" name="remember">
                <span>Ingat saya</span>
            </label>
            <button class="btn" type="submit">Login</button>
        </form>
        </div>
    </div>
</body>
</html>
