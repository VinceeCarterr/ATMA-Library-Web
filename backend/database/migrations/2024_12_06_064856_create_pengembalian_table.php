<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pengembalian', function (Blueprint $table) {
            $table->id('id_pengembalian');
            $table->foreignId('id_pinjam')->constrained('peminjaman', 'id_pinjam');
            $table->foreignId('id_user')->constrained('users', 'id_user');
            $table->date('tgl_pinjam');
            $table->double('jml_denda')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengembalian');
    }
};
