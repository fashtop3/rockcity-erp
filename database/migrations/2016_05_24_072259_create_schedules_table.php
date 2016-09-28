<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('order_no');
            $table->integer('user_id')->unsigned();
            $table->integer('client_id')->unsigned();
            $table->string('promocode');

            $table->integer('discount');
            $table->decimal('discountAmt', 12, 2);
            $table->integer('commission');
            $table->decimal('commissionAmt', 12, 2);
            $table->decimal('subTotal', 12, 2);
            $table->decimal('grandTotal', 12, 2);

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('schedules');
    }
}
