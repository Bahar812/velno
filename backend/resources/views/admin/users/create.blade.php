@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Tambah User</h2>
        <a href="{{ route('admin.users.index') }}" class="btn btn-secondary">Kembali</a>
    </div>
    <div class="card">
        <form method="POST" action="{{ route('admin.users.store') }}">
            @csrf
            <div class="form-group">
                <label>Nama</label>
                <input type="text" name="name" value="{{ old('name') }}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" value="{{ old('email') }}" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <div class="form-group">
                <label class="checkbox-row">
                    <input type="checkbox" name="is_admin" value="1">
                    <span>Admin?</span>
                </label>
            </div>
            <button class="btn" type="submit">Simpan</button>
        </form>
    </div>
@endsection
