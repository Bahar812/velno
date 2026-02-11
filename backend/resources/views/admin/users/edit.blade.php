@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Edit User</h2>
        <a href="{{ route('admin.users.index') }}" class="btn btn-secondary">Kembali</a>
    </div>
    <div class="card">
        <form method="POST" action="{{ route('admin.users.update', $user) }}">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>Nama</label>
                <input type="text" name="name" value="{{ old('name', $user->name) }}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" value="{{ old('email', $user->email) }}" required>
            </div>
            <div class="form-group">
                <label>Password (opsional)</label>
                <input type="password" name="password">
            </div>
            <div class="form-group">
                <label class="checkbox-row">
                    <input type="checkbox" name="is_admin" value="1" {{ $user->is_admin ? 'checked' : '' }}>
                    <span>Admin?</span>
                </label>
            </div>
            <button class="btn" type="submit">Update</button>
        </form>
    </div>
@endsection
