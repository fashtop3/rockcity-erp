<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_times', function (Blueprint $table) {
            $table->increments('id');
            $table->time('premium_start');
            $table->time('premium_end');
            $table->time('regular_start');
            $table->time('regular_end');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('product_times');
    }
}
