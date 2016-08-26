<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleProductSubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_product_subs', function (Blueprint $table) {
            $table->increments('id');
//            $table->integer('schedule_id')->unsigned();
            $table->integer('schedule_product_id')->unsigned();
            $table->foreign('schedule_product_id')->references('id')->on('schedule_products')->onDelete('cascade');

            $table->text('subscription');

            $table->timestamps();

//            $table->foreign('schedule_id')->references('id')->on('schedules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('schedule_product_subs');
    }
}
