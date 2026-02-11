@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Tambah Portfolio</h2>
        <a href="{{ route('admin.portfolios.index') }}" class="btn btn-secondary">Kembali</a>
    </div>
    <div class="card">
        <form method="POST" action="{{ route('admin.portfolios.store') }}" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label>Judul</label>
                <input type="text" name="title" value="{{ old('title') }}" required>
            </div>
            <div class="form-group">
                <label>Tahun</label>
                <input type="text" name="year" value="{{ old('year') }}">
            </div>
            <div class="form-group">
                <label>Deskripsi</label>
                <textarea name="description">{{ old('description') }}</textarea>
            </div>
            <div class="form-group">
                <label>Link Portfolio</label>
                <input type="text" name="portfolio_link" value="{{ old('portfolio_link') }}" placeholder="https://">
            </div>
            <div class="form-group">
                <label>Gambar 1</label>
                <input type="file" name="image_1" accept="image/*">
            </div>
            <div class="form-group">
                <label>Gambar 2</label>
                <input type="file" name="image_2" accept="image/*">
            </div>
            <div class="form-group">
                <label class="checkbox-row">
                    <input type="checkbox" name="is_active" value="1" checked>
                    <span>Aktif</span>
                </label>
            </div>
            <button class="btn" type="submit">Simpan</button>
        </form>
    </div>
@endsection
