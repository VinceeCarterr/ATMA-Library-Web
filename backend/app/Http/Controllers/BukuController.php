<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    public function index()
    {
        // Everyone can view books
        $buku = Buku::all();
        return response()->json($buku, 200);
    }

    public function getTopBooks()
    {
        $buku = Buku::orderBy('jml_pinjam', 'desc')->take(10)->get();

        return response()->json($buku, 200);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $validated = $request->validate([
            'kategori' => 'required|string|max:255',
            'thn_terbit' => 'required|date|before_or_equal:' . date('Y-m-d'),
            'judul' => 'required|string|max:255',
            'jml_pinjam' => 'required|integer|min:0',
            'stok' => 'required|integer|min:0',
            'pengarang' => 'required|string|max:255',
            'status' => 'required|string|in:available,borrowed',
            'isbn' => 'nullable|string|max:13|unique:buku,isbn',
            'book_poster' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('book_poster')) {
            $image = $request->file('book_poster');
            $path = $image->store('book_posters', 'public');
            \Log::info('File uploaded to: ' . $path); // Log file path
            $validated['book_poster'] = $path;
        }

        // Create the book record
        $buku = Buku::create($validated);

        return response()->json($buku, 201);
    }

    public function show($id)
    {
        $buku = Buku::find($id);

        if (!$buku) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json($buku, 200);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Find the book
        $buku = Buku::find($id);
        if (!$buku) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        // Validate the incoming request
        $validated = $request->validate([
            'kategori' => 'required|string|max:255',
            'thn_terbit' => 'required|date|before_or_equal:' . date('Y-m-d'),
            'judul' => 'required|string|max:255',
            'jml_pinjam' => 'required|integer|min:0',
            'stok' => 'required|integer|min:0',
            'pengarang' => 'required|string|max:255',
            'status' => 'required|string|in:available,borrowed',
            'isbn' => 'nullable|string|max:13',
            'book_poster' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle file upload for book_poster
        if ($request->hasFile('book_poster')) {
            $image = $request->file('book_poster');
            $path = $image->store('book_posters', 'public');

            // Delete old book poster if exists
            if ($buku->book_poster) {
                \Storage::disk('public')->delete($buku->book_poster);
            }

            // Add new file path to validated data
            $validated['book_poster'] = $path;
        }

        // Update the book record
        $buku->update($validated);

        return response()->json($buku->refresh(), 200);
    }
       
    public function destroy($id)
    {
        // Only admin can delete a book
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $buku = Buku::find($id);

        if (!$buku) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $buku->delete();
        return response()->json(['message' => 'Book deleted successfully'], 200);
    }
}
