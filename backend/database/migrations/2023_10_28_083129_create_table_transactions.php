<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->float('amount');
            $table->bigInteger('category_id');
            $table->bigInteger('user_id');
            $table->bigInteger('wallet_id');
            $table->string('note');
            $table->string('image')->nullable();
            $table->boolean('report_exclude')->default(false)->nullable();
            $table->dateTime('action_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
