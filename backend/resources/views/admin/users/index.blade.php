@extends('admin.layouts.app')

@section('content')
    <div class="topbar" style="align-items:flex-start;">
        <div>
            <div class="tabs">
                <a class="tab {{ request('role') !== 'admin' ? 'active' : '' }}" href="{{ route('admin.users.index') }}">Members</a>
                <a class="tab {{ request('role') === 'admin' ? 'active' : '' }}" href="{{ route('admin.users.index', ['role' => 'admin']) }}">Admins</a>
            </div>
            <div class="muted" style="margin-top:8px; font-size:13px;">
                Total members: {{ $users->total() }}
            </div>
        </div>
        <div class="toolbar">
            <a href="{{ route('admin.users.create') }}" class="btn">Add new</a>
            <button class="btn btn-secondary" type="button">Import members</button>
            <button class="btn btn-secondary" type="button">Export members (Excel)</button>
            <button class="btn btn-secondary" type="button">Filter</button>
        </div>
    </div>

    <div class="card">
        <table class="table-card">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Member name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse($users as $user)
                    @php
                        $initial = strtoupper(substr($user->name ?? 'U', 0, 1));
                    @endphp
                    <tr>
                        <td>
                            <div class="avatar">{{ $initial }}</div>
                        </td>
                        <td>
                            <strong>{{ $user->name }}</strong>
                        </td>
                        <td class="muted">{{ $user->email }}</td>
                        <td>
                            <span class="status-pill status-active">Aktif</span>
                        </td>
                        <td>
                            <span class="status-pill {{ $user->is_admin ? 'status-admin' : 'status-active' }}">
                                {{ $user->is_admin ? 'Admin' : 'Member' }}
                            </span>
                        </td>
                        <td>
                            <div class="table-actions">
                                <a class="icon-btn" href="{{ route('admin.users.edit', $user) }}" title="Edit">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                                    </svg>
                                </a>
                                <form action="{{ route('admin.users.destroy', $user) }}" method="POST" onsubmit="return confirm('Hapus user ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button class="icon-btn" type="submit" title="Hapus">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                                            <path d="M10 11v6"></path>
                                            <path d="M14 11v6"></path>
                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">Belum ada user.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div style="margin-top:16px;">
            {{ $users->links() }}
        </div>
    </div>
@endsection
