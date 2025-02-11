<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'buku';
    
    protected $primaryKey = 'id_buku';

    protected $fillable = [
        'kategori',
        'thn_terbit',
        'judul',
        'jml_pinjam',
        'stok',
        'pengarang',
        'status',
        'isbn',
        'book_poster',
    ];
}

