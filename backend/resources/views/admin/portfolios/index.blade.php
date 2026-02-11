@extends('admin.layouts.app')

@section('content')
    <div class="topbar">
        <h2>Portfolio</h2>
        <a href="{{ route('admin.portfolios.create') }}" class="btn">Tambah Portfolio</a>
    </div>
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th>Judul</th>
                    <th>Tahun</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @forelse($portfolios as $portfolio)
                    <tr>
                        <td>{{ $portfolio->title }}</td>
                        <td>{{ $portfolio->year }}</td>
                        <td>{{ $portfolio->is_active ? 'Aktif' : 'Nonaktif' }}</td>
                        <td>
                            <a class="btn-link" href="{{ route('admin.portfolios.edit', $portfolio) }}">Edit</a>
                            <form action="{{ route('admin.portfolios.destroy', $portfolio) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="btn-link" onclick="return confirm('Hapus portfolio ini?')">Hapus</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">Belum ada portfolio.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div style="margin-top:16px;">
            {{ $portfolios->links() }}
        </div>
    </div>
@endsection
