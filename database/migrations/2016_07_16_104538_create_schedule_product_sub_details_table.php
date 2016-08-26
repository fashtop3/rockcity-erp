<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleProductSubDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_product_sub_details', function (Blueprint $table) {
            $table->increments('id');

//            $table->integer('schedule_id')->unsigned();
//            $table->foreign('schedule_id')->references('id')->on('schedules')->onDelete('cascade');

            $table->integer('schedule_product_sub_id')->unsigned();
            $table->foreign('schedule_product_sub_id')->references('id')->on('schedule_product_subs')->onDelete('cascade');

            $table->longText('schedule');

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
        Schema::drop('schedule_product_sub_details');
    }
}
