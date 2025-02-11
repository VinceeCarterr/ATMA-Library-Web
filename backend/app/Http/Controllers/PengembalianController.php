<?php

namespace App\Http\Controllers;

use App\Models\Pengembalian;
use App\Models\Buku;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengembalianController extends Controller
{
    /**
     * Display a listing of the pengembalian.
     * - Admin: Can view all pengembalian.
     * - Anggota: Can view only their own pengembalian.
     */
    public function index(Request $request)
    {
        try {
            $pengembalians = Pengembalian::with(['user:id_user,name', 'peminjaman.buku'])
                ->when($request->id_user, function ($query) use ($request) {
                    $query->where('id_user', $request->id_user);
                })
                ->get()
                ->map(function ($pengembalian) {
                    $tglKembali = $pengembalian->peminjaman->tgl_kembali;
                    
                    if ($tglKembali) {
                        $returnDate = new \DateTime($tglKembali);
                        $today = new \DateTime();
    
                        if ($returnDate < $today) {
                            $diffInSeconds = $today->getTimestamp() - $returnDate->getTimestamp();
                            $overdueDays = ceil($diffInSeconds / (60 * 60 * 24));
                        } else {
                            $overdueDays = 0;
                        }                        
    
                        $pengembalian->calculated_denda = $overdueDays * 50000;
                    } else {
                        $pengembalian->calculated_denda = 0;
                    }
    
                    return $pengembalian;
                });
    
            return response()->json($pengembalians);
        } catch (\Exception $e) {
            \Log::error('Error fetching pengembalian: ' . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500);
        }
    }       

    /**
     * Store a newly created pengembalian in storage.
     * - Only Admin can create.
     */
    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $validated = $request->validate([
            'id_pinjam' => 'required|integer|exists:peminjaman,id_pinjam',
            'id_user' => 'required|integer|exists:users,id_user',
            'jml_denda' => 'required|numeric',
        ]);

        $pengembalian = Pengembalian::create($validated);

        return response()->json($pengembalian, 201);
    }

    /**
     * Display the specified pengembalian.
     * - Admin: Can view any pengembalian.
     * - Anggota: Can only view their own pengembalian.
     */
    public function show($id)
    {
        $pengembalian = Pengembalian::findOrFail($id);

        if (auth()->user()->role === 'anggota' && $pengembalian->id_user !== auth()->id()) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return response()->json($pengembalian);
    }

    /**
     * Update the specified pengembalian in storage.
     * - Only Admin can update.
     */
    public function update(Request $request, $id)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $pengembalian = Pengembalian::findOrFail($id);

        $validated = $request->validate([
            'id_pinjam' => 'sometimes|integer|exists:peminjaman,id_pinjam',
            'id_user' => 'sometimes|integer|exists:users,id_user',
            'jml_denda' => 'sometimes|numeric',
        ]);

        $pengembalian->update($validated);

        return response()->json($pengembalian);
    }

    /**
     * Remove the specified pengembalian from storage.
     * - Only Admin can delete.
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
    
            \Log::info("Attempting to delete pengembalian with ID: {$id}");
    
            $pengembalian = Pengembalian::findOrFail($id);
            \Log::info('Pengembalian record found:', ['pengembalian' => $pengembalian]);
    
            $peminjaman = $pengembalian->peminjaman;
            if (!$peminjaman) {
                \Log::warning("No related peminjaman found for pengembalian ID: {$id}");
            } else {
                \Log::info('Peminjaman record found:', ['peminjaman' => $peminjaman]);
    
                $buku = Buku::findOrFail($peminjaman->id_buku);
                \Log::info('Buku record found:', ['buku' => $buku]);
    
                $buku->increment('stok', 1);
                \Log::info("Stock incremented for book ID: {$buku->id_buku}");
    
                $pengembalian->delete();
                \Log::info("Pengembalian ID {$id} deleted successfully.");
    
                $peminjaman->delete();
                \Log::info("Peminjaman ID {$peminjaman->id_pinjam} deleted successfully.");
            }
    
            DB::commit();
    
            return response()->json([
                'message' => 'Pengembalian and associated peminjaman deleted successfully. Stock updated.',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
    
            \Log::error("Error deleting pengembalian ID {$id}: {$e->getMessage()}");
    
            return response()->json([
                'message' => 'Error deleting pengembalian',
                'error' => $e->getMessage(),
            ], 500);
        }
    }       
}
