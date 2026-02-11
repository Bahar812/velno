@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Edit Portfolio</h2>
        <a href="{{ route('admin.portfolios.index') }}" class="btn btn-secondary">Kembali</a>
    </div>
    <div class="card">
        <form method="POST" action="{{ route('admin.portfolios.update', $portfolio) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>Judul</label>
                <input type="text" name="title" value="{{ old('title', $portfolio->title) }}" required>
            </div>
            <div class="form-group">
                <label>Tahun</label>
                <input type="text" name="year" value="{{ old('year', $portfolio->year) }}">
            </div>
            <div class="form-group">
                <label>Deskripsi</label>
                <textarea name="description">{{ old('description', $portfolio->description) }}</textarea>
            </div>
            <div class="form-group">
                <label>Link Portfolio</label>
                <input type="text" name="portfolio_link" value="{{ old('portfolio_link', $portfolio->portfolio_link) }}" placeholder="https://">
            </div>
            <div class="form-group">
                <label>Gambar 1</label>
                <input type="file" name="image_1" accept="image/*">
                @if($imageOne)
                    <div style="margin-top:8px;">
                        <img src="{{ asset('storage/' . $imageOne) }}" alt="Gambar 1" style="width:120px;border-radius:10px;border:1px solid rgba(122,75,255,0.15);">
                    </div>
                @endif
            </div>
            <div class="form-group">
                <label>Gambar 2</label>
                <input type="file" name="image_2" accept="image/*">
                @if($imageTwo)
                    <div style="margin-top:8px;">
                        <img src="{{ asset('storage/' . $imageTwo) }}" alt="Gambar 2" style="width:120px;border-radius:10px;border:1px solid rgba(122,75,255,0.15);">
                    </div>
                @endif
            </div>
            <div class="form-group">
                <label class="checkbox-row">
                    <input type="checkbox" name="is_active" value="1" {{ $portfolio->is_active ? 'checked' : '' }}>
                    <span>Aktif</span>
                </label>
            </div>
            <button class="btn" type="submit">Update</button>
        </form>
    </div>
@endsection
