<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeminjamanController extends Controller
{
    public function index()
    {
        if (auth()->user()->role === 'anggota') {
            $peminjaman = Peminjaman::where('id_user', auth()->id())
                ->with('buku')
                ->get();

            return response()->json($peminjaman);
        }

        $peminjaman = Peminjaman::with('buku')->get(); 

        return response()->json($peminjaman);
    }

    public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'id_user' => 'required|integer|exists:users,id_user',
            'id_buku' => 'required|integer|exists:buku,id_buku',
            'tgl_pinjam' => 'required|date',
            'tgl_kembali' => 'nullable|date',
            'status' => 'required|string',
        ]);

        // Additional debugging
        \Log::info('Validated data: ', $validated);

        // Start transaction
        DB::beginTransaction();

        // Create the peminjaman entry
        $peminjaman = Peminjaman::create($validated);

        DB::commit();

        return response()->json($peminjaman, 201);
    } catch (\Exception $e) {
        DB::rollBack();

        // Log the error
        \Log::error('Error in store method:', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
    }
}

    public function show($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        // Anggota can only view their own loans
        if (auth()->user()->role === 'anggota' && $peminjaman->id_user !== auth()->id()) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return response()->json($peminjaman);
    }

    public function update(Request $request, $id)
    {
        // Only admin can update a loan
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        // Validate only the 'status' field
        $validated = $request->validate([
            'status' => 'required|string|in:pending,borrowed,declined,returned',
        ]);

        // Find the loan by ID
        $peminjaman = Peminjaman::findOrFail($id);

        // Start a transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // If status is being updated to 'borrowed', adjust the book stock
            if ($validated['status'] === 'borrowed') {
                $buku = Buku::findOrFail($peminjaman->id_buku);

                // Ensure there is stock available
                if ($buku->stok <= 0) {
                    return response()->json(['message' => 'Book is out of stock'], 400);
                }

                $buku->decrement('stok', 1); // Decrease stock by 1
                $buku->increment('jml_pinjam', 1); // Increase borrow count by 1
            }

            // Update the 'status' field
            $peminjaman->update(['status' => $validated['status']]);

            DB::commit();

            return response()->json([
                'message' => 'Loan status updated successfully',
                'data' => $peminjaman,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error updating loan', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        // Only admin can delete a loan
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->delete();
        return response()->json(['message' => 'Loan deleted successfully']);
    }

    public function getByUser ($id_user)
    {
        if (auth()->id() !== (int)$id_user) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $peminjaman = Peminjaman::where('id_user', $id_user)
        ->where('status', 'borrowed')
        ->with('Buku')
        ->get();
        return response()->json($peminjaman);
    }

    public function checkUserBook(Request $request)
    {
        $validated = $request->validate([
            'id_user' => 'required|integer|exists:users,id_user',
            'id_buku' => 'required|integer|exists:buku,id_buku',
        ]);
    
        $peminjaman = Peminjaman::where('id_user', $validated['id_user'])
            ->where('id_buku', $validated['id_buku'])
            ->where('status', '!=', 'returned') // Check for active loans (not returned)
            ->first();
    
        if ($peminjaman) {
            return response()->json(['borrowed' => true, 'status' => $peminjaman->status]);
        }
    
        return response()->json(['borrowed' => false, 'status' => null]);
    }
}
