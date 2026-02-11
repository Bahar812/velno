@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Edit Konten Homepage</h2>
        <a href="{{ route('admin.homepage.index') }}" class="btn btn-secondary">Kembali</a>
    </div>
    <div class="card">
        <form method="POST" action="{{ route('admin.homepage.update', $content) }}">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>Key</label>
                <input type="text" value="{{ $content->key }}" disabled>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" value="{{ old('title', $content->title) }}">
            </div>
            <div class="form-group">
                <label>Subtitle</label>
                <input type="text" name="subtitle" value="{{ old('subtitle', $content->subtitle) }}">
            </div>
            <div class="form-group">
                <label>Body</label>
                <textarea name="body">{{ old('body', $content->body) }}</textarea>
            </div>
            <div class="form-group">
                <label>Data (JSON)</label>
                <textarea name="data">{{ old('data', $dataJson) }}</textarea>
            </div>
            <button class="btn" type="submit">Update</button>
        </form>
    </div>
@endsection
