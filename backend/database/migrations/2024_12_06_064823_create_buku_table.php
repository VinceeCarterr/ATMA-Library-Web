<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->id('id_buku');
            $table->string('kategori');
            $table->year('thn_terbit');
            $table->string('judul');
            $table->integer('jml_pinjam')->default(0);
            $table->integer('stok');
            $table->string('pengarang');
            $table->enum('status', ['available', 'borrowed'])->default('available');
            $table->string('isbn')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('buku');
    }
};
