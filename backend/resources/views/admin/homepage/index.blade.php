@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Homepage Content</h2>
        <a href="{{ route('admin.homepage.create') }}" class="btn">Tambah Konten</a>
    </div>
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @forelse($contents as $content)
                    <tr>
                        <td>{{ $content->key }}</td>
                        <td>{{ $content->title }}</td>
                        <td>{{ $content->subtitle }}</td>
                        <td>
                            <a class="btn-link" href="{{ route('admin.homepage.edit', $content) }}">Edit</a>
                            <form action="{{ route('admin.homepage.destroy', $content) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="btn-link" onclick="return confirm('Hapus konten ini?')">Hapus</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">Belum ada konten.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
