<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        return view('admin.portfolios.index', [
            'portfolios' => Portfolio::orderByDesc('created_at')->paginate(12),
        ]);
    }

    public function create()
    {
        return view('admin.portfolios.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:10'],
            'description' => ['nullable', 'string'],
            'portfolio_link' => ['nullable', 'string', 'max:255'],
            'image_1' => ['nullable', 'image', 'max:4096'],
            'image_2' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $portfolio = Portfolio::create([
            'title' => $data['title'],
            'year' => $data['year'] ?? null,
            'description' => $data['description'] ?? null,
            'portfolio_link' => $data['portfolio_link'] ?? null,
            'images' => $this->storeImages($request),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.portfolios.edit', $portfolio)
            ->with('status', 'Portfolio berhasil dibuat.');
    }

    public function edit(Portfolio $portfolio)
    {
        return view('admin.portfolios.edit', [
            'portfolio' => $portfolio,
            'imageOne' => $portfolio->images[0] ?? '',
            'imageTwo' => $portfolio->images[1] ?? '',
        ]);
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:10'],
            'description' => ['nullable', 'string'],
            'portfolio_link' => ['nullable', 'string', 'max:255'],
            'image_1' => ['nullable', 'image', 'max:4096'],
            'image_2' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $images = $this->updateStoredImages($request, $portfolio->images ?? []);

        $portfolio->update([
            'title' => $data['title'],
            'year' => $data['year'] ?? null,
            'description' => $data['description'] ?? null,
            'portfolio_link' => $data['portfolio_link'] ?? null,
            'images' => $images,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.portfolios.edit', $portfolio)
            ->with('status', 'Portfolio berhasil diperbarui.');
    }

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')
            ->with('status', 'Portfolio berhasil dihapus.');
    }

    private function storeImages(Request $request): array
    {
        $images = [];

        foreach (['image_1', 'image_2'] as $field) {
            if ($request->hasFile($field)) {
                $images[] = $request->file($field)->store('portfolios', 'public');
            }
        }

        return $images;
    }

    private function updateStoredImages(Request $request, array $existing): array
    {
        $images = array_values($existing);

        if ($request->hasFile('image_1')) {
            $images[0] = $request->file('image_1')->store('portfolios', 'public');
        }

        if ($request->hasFile('image_2')) {
            $images[1] = $request->file('image_2')->store('portfolios', 'public');
        }

        return collect($images)
            ->filter()
            ->values()
            ->all();
    }
}
