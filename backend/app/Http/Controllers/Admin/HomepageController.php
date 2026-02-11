<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    public function index()
    {
        return view('admin.homepage.index', [
            'contents' => HomepageContent::orderBy('key')->get(),
        ]);
    }

    public function create()
    {
        return view('admin.homepage.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:120', 'unique:homepage_contents,key'],
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'data' => ['nullable', 'string'],
        ]);

        HomepageContent::create([
            'key' => $data['key'],
            'title' => $data['title'] ?? null,
            'subtitle' => $data['subtitle'] ?? null,
            'body' => $data['body'] ?? null,
            'data' => $this->parseJson($data['data'] ?? null),
        ]);

        return redirect()->route('admin.homepage.index')
            ->with('status', 'Konten homepage berhasil dibuat.');
    }

    public function edit(HomepageContent $homepage)
    {
        return view('admin.homepage.edit', [
            'content' => $homepage,
            'dataJson' => $homepage->data ? json_encode($homepage->data, JSON_PRETTY_PRINT) : '',
        ]);
    }

    public function update(Request $request, HomepageContent $homepage)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'data' => ['nullable', 'string'],
        ]);

        $homepage->update([
            'title' => $data['title'] ?? null,
            'subtitle' => $data['subtitle'] ?? null,
            'body' => $data['body'] ?? null,
            'data' => $this->parseJson($data['data'] ?? null),
        ]);

        return redirect()->route('admin.homepage.edit', $homepage)
            ->with('status', 'Konten homepage berhasil diperbarui.');
    }

    public function destroy(HomepageContent $homepage)
    {
        $homepage->delete();

        return redirect()->route('admin.homepage.index')
            ->with('status', 'Konten homepage berhasil dihapus.');
    }

    private function parseJson(?string $value): ?array
    {
        if (! $value) {
            return null;
        }

        $decoded = json_decode($value, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $decoded;
        }

        return null;
    }
}
