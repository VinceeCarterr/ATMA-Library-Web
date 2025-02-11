<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    protected $table = 'pengembalian';

    protected $primaryKey = 'id_pengembalian';

    protected $fillable = [
        'id_pinjam',
        'id_user',
        'jml_denda',
    ];

    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class, 'id_pinjam', 'id_pinjam');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user')->withDefault([
            'name' => 'Unknown User',
        ]);
    }
}

