@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Tambah Konten Homepage</h2>
        <a href="{{ route('admin.homepage.index') }}" class="btn btn-secondary">Kembali</a>
    </div>
    <div class="card">
        <form method="POST" action="{{ route('admin.homepage.store') }}">
            @csrf
            <div class="form-group">
                <label>Key (unik)</label>
                <input type="text" name="key" value="{{ old('key') }}" required>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" value="{{ old('title') }}">
            </div>
            <div class="form-group">
                <label>Subtitle</label>
                <input type="text" name="subtitle" value="{{ old('subtitle') }}">
            </div>
            <div class="form-group">
                <label>Body</label>
                <textarea name="body">{{ old('body') }}</textarea>
            </div>
            <div class="form-group">
                <label>Data (JSON)</label>
                <textarea name="data" placeholder='{"items":["A","B"]}'>{{ old('data') }}</textarea>
            </div>
            <button class="btn" type="submit">Simpan</button>
        </form>
    </div>
@endsection
